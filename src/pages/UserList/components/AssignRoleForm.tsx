/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Modal, Checkbox, Row } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { TableListItem } from '../data';
import { getRoleList } from '../service';

export interface FormValueType extends Partial<TableListItem> {}

export interface AssignPermissionFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  roleList: TableListItem[];
}

export interface AssignPermissionFormState {
  formVals: FormValueType;
}

class AssignPermissionForm extends Component<AssignPermissionFormProps, AssignPermissionFormState> {
  static defaultProps = {
    handleAssignPermission: () => {},
    handleAssignPermissionModalVisible: () => {},
    values: {},
    roleList: [],
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: AssignPermissionFormProps) {
    super(props);

    this.state = {
      formVals: {
        _id: props.values._id,
        roleIds: props.values.roleIds,
      },
    };
  }

  onChange = (checkedValues: any) => {
    const formVals = { ...this.state.formVals };
    formVals.roleIds = checkedValues;
    this.setState({ formVals });
  };

  getPermissionChecnkLis = async () => {
    const result = await getRoleList();
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
    const { form, onSubmit: handleAssignPermission } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          handleAssignPermission({
            ...fieldsValue,
            roleIds: oldValue.roleIds,
            _id: oldValue._id,
          });
        },
      );
    });
  };

  renderContent = (formVals: FormValueType) => {
    const { form, roleList } = this.props;
    return (
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={this.onChange}
        value={this.state.formVals.roleIds}
      >
        <Row>
          {roleList.map((item: any) => (
            <Checkbox value={item._id} key={item._id}>
              {item.name}
            </Checkbox>
          ))}
        </Row>
      </Checkbox.Group>
    );
  };

  renderFooter = () => {
    const { onCancel: handleAssignPermissionModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleAssignPermissionModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext()}>
        保存
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, onCancel: handleAssignPermissionModalVisible, values } = this.props;
    const { formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="分配角色"
        visible={updateModalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleAssignPermissionModalVisible(false, values)}
        afterClose={() => handleAssignPermissionModalVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

export default Form.create<AssignPermissionFormProps>()(AssignPermissionForm);
