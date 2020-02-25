/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Modal, Checkbox, Row } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { TableListItem } from '../data.d';
import { getPermissionList } from '../service';

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  permissionList: TableListItem[];
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
    permissionList: [],
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      formVals: {
        _id: props.values._id,
        name: props.values.name,
        description: props.values.description,
        permissionIds: props.values.permissionIds,
      },
    };
  }

  onChange = (checkedValues: any) => {
    const formVals = { ...this.state.formVals };
    formVals.permissionIds = checkedValues;
    this.setState({ formVals });
  };

  getPermissionChecnkLis = async () => {
    const result = await getPermissionList();
    return (
      <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
        <Row>
          {result.data.permissions.map((item: any) => (
            <Checkbox value={item._id} key={item._id}>
              {item.name}
            </Checkbox>
          ))}
        </Row>
      </Checkbox.Group>
    );
  };

  handleNext = () => {
    const { form, onSubmit: handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          handleUpdate({
            ...fieldsValue,
            permissionIds: oldValue.permissionIds,
            _id: oldValue._id,
          });
        },
      );
    });
  };

  renderContent = (formVals: FormValueType) => {
    const { form, permissionList } = this.props;
    return [
      <FormItem key="name" {...this.formLayout} label="角色名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入角色名称！' }],
          initialValue: formVals.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="description" {...this.formLayout} label="角色描述">
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: '请输入至少五个字符的角色描述！', min: 1 }],
          initialValue: formVals.description,
        })(<Input placeholder="请输入至少一个字符" />)}
      </FormItem>,
      <FormItem key="xxxx" {...this.formLayout} label="角色描述">
        <Checkbox.Group
          style={{ width: '100%' }}
          onChange={this.onChange}
          value={this.state.formVals.permissionIds}
        >
          <Row>
            {permissionList.map((item: any) => (
              <Checkbox value={item._id} key={item._id}>
                {item.name}
              </Checkbox>
            ))}
          </Row>
        </Checkbox.Group>
      </FormItem>,
    ];
  };

  renderFooter = () => {
    const { onCancel: handleUpdateModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext()}>
        保存
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, onCancel: handleUpdateModalVisible, values } = this.props;
    const { formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="角色配置"
        visible={updateModalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
