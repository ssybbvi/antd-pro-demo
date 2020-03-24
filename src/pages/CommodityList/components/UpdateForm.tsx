import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, DatePicker, Input, Modal, Radio, Select, Steps, InputNumber } from 'antd';
import React, { Component } from 'react';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { CommodityTableListItem } from '../data.d';
import { PicturesWall } from './PicturesWall';

export interface FormValueType extends Partial<CommodityTableListItem> {}

export interface UpdateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: CommodityTableListItem) => void;
  onSubmit: (values: CommodityTableListItem) => void;
  updateModalVisible: boolean;
  values: CommodityTableListItem;
}
const FormItem = Form.Item;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: CommodityTableListItem;
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
        price: props.values.price,
        descrption: props.values.descrption,
        images: props.values.images,
        fakePrice: props.values.fakePrice,
        sales: props.values.sales,
        restrictedPurchaseQuantity: props.values.restrictedPurchaseQuantity,
        tags: props.values.tags,
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
      <FormItem key="name" {...this.formLayout} label="商品名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入商品名称！' }],
          initialValue: formVals.name,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="price" {...this.formLayout} label="商品价格">
        {form.getFieldDecorator('price', {
          rules: [],
          initialValue: formVals.price,
        })(<InputNumber min={1} />)}
      </FormItem>,
      <FormItem key="fakePrice" {...this.formLayout} label="虚假价格">
        {form.getFieldDecorator('fakePrice', {
          rules: [{ required: true, message: '请输入至少一个字符的商品描述！', min: 1 }],
          initialValue: formVals.fakePrice,
        })(<Input placeholder="请输入至少一个字符" />)}
      </FormItem>,
      <FormItem key="restrictedPurchaseQuantity" {...this.formLayout} label="限购数量">
        {form.getFieldDecorator('restrictedPurchaseQuantity', {
          rules: [],
          initialValue: formVals.restrictedPurchaseQuantity,
        })(<InputNumber min={1} />)}
      </FormItem>,
      <FormItem key="descrption" {...this.formLayout} label="商品描述">
        {form.getFieldDecorator('descrption', {
          rules: [{ required: true, message: '请输入至少五个字符的商品描述！', min: 5 }],
          initialValue: formVals.descrption,
        })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
      </FormItem>,
      <FormItem key="xx" {...this.formLayout} label="图片">
        {form.getFieldDecorator('images', {
          rules: [],
          initialValue: formVals.descrption,
        })(<PicturesWall images={formVals.images!}></PicturesWall>)}
      </FormItem>,
      <FormItem key="tags" {...this.formLayout} label="标签">
        {form.getFieldDecorator('tags', {
          rules: [{ required: true, message: '请输入至少五个字符的商品描述！', min: 5 }],
          initialValue: formVals.tags,
        })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
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
        width={1080}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="编辑商品"
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
