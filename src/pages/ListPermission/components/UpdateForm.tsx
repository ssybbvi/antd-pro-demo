/* eslint-disable no-underscore-dangle */
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Modal } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
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
        discriminator: props.values.discriminator,
      },
    };
  }

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
          handleUpdate(formVals);
        },
      );
    });
  };

  renderContent = (formVals: FormValueType) => {
    const { form } = this.props;
    return [
      <FormItem key="name" {...this.formLayout} label="权限名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入权限名称！' }],
          initialValue: formVals.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="discriminator" {...this.formLayout} label="权限描述">
        {form.getFieldDecorator('discriminator', {
          rules: [{ required: true, message: '请输入至少五个字符的权限描述！', min: 1 }],
          initialValue: formVals.discriminator,
        })(<Input placeholder="请输入至少一个字符" />)}
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
        title="权限配置"
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
