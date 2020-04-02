import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, DatePicker, Input, Modal, Radio, Select, Steps, InputNumber } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { ShippedParams } from '../data';


export interface AuditFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: ShippedParams) => void;
  onSubmit: (values: ShippedParams) => void;
  AuditModalVisible: boolean;
  values: ShippedParams;
}
const FormItem = Form.Item;
const { TextArea } = Input;

export interface AuditFormState {
  formVals: ShippedParams;
}

class AuditForm extends Component<AuditFormProps, AuditFormState> {
  static defaultProps = {
    handleaudit: () => { },
    handleAuditModalVisible: () => { },
    values: {},
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: AuditFormProps) {
    super(props);

    this.state = {
      formVals: {
        orderId: "",
        shippedNumber: "",
        shippedType: "",
      },
    };
  }

  handleNext = () => {
    const { form, onSubmit: handleaudit } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          handleaudit(formVals);
        },
      );
    });
  };

  renderContent = (formVals: ShippedParams) => {
    const { form } = this.props;
    return [
      <FormItem key="shippedType" {...this.formLayout} label="快递方式">
        {form.getFieldDecorator('shippedType', {
          rules: [{ required: true, message: '请输入快递方式！' }],
          initialValue: formVals.shippedType,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="shippedNumber" {...this.formLayout} label="快递单号">
        {form.getFieldDecorator('shippedNumber', {
          rules: [{ required: true, message: '请输入快递单号！' }],
          initialValue: formVals.shippedNumber,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
    ];
  };

  renderFooter = () => {
    const { onCancel: handleAuditModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleAuditModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext()}>
        保存
      </Button>,
    ];
  };

  render() {
    const { AuditModalVisible, onCancel: handleAuditModalVisible, values } = this.props;
    const { formVals } = this.state;

    return (
      <Modal
        width={580}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="发货"
        visible={AuditModalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleAuditModalVisible(false, values)}
        afterClose={() => handleAuditModalVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

export default Form.create<AuditFormProps>()(AuditForm);
