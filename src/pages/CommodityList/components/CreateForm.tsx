import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, InputNumber, Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import React, { Component } from 'react';
import { PicturesWall } from './PicturesWall';
import { CommodityTableListItem } from '../data';
import EditableTagGroup from './EditableTagGroup';

export interface FormValueType extends Omit<CommodityTableListItem, "_id"> { }

interface CreateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: CommodityTableListItem) => void;
  onSubmit: (values: FormValueType) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;
const { TextArea } = Input;

export interface UpdateFormState {
  formVals: FormValueType;
}


class CreateForm extends Component<CreateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => { },
    handlecreateModalVisible: () => { },
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props: CreateFormProps) {
    super(props);

    this.state = {
      formVals: {
        name: "",
        price: 1,
        descrption: "",
        images: [],
        fakePrice: "",
        sales: 0,
        restrictedPurchaseQuantity: 5,
        tags: [],
        imgesDescrptionList: [],
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
          this.setState({
            formVals: {
              name: "",
              price: 1,
              descrption: "",
              images: [],
              fakePrice: "",
              sales: 0,
              restrictedPurchaseQuantity: 5,
              tags: [],
              imgesDescrptionList: [],
            }
          })
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
      <FormItem key="images" {...this.formLayout} label="图片">
        {form.getFieldDecorator('images', {
          rules: [],
          initialValue: formVals.images,
        })(<PicturesWall images={formVals.images!} listType={"picture-card"}></PicturesWall>)}
      </FormItem>,
      <FormItem key="price" {...this.formLayout} label="积分">
        {form.getFieldDecorator('price', {
          rules: [],
          initialValue: formVals.price,
        })(<InputNumber min={1} />)}
      </FormItem>,
      <FormItem key="fakePrice" {...this.formLayout} label="市场价格">
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
          rules: [],
          initialValue: formVals.descrption,
        })(<TextArea rows={4} />)}
      </FormItem>,

      <FormItem key="imgesDescrptionList" {...this.formLayout} label="商品图片描述">
        {form.getFieldDecorator('imgesDescrptionList', {
          rules: [],
          initialValue: formVals.imgesDescrptionList,
        })(<PicturesWall images={formVals.imgesDescrptionList!} listType={"picture"}></PicturesWall>)}
      </FormItem>,

      <FormItem key="tags" {...this.formLayout} label="标签">
        {form.getFieldDecorator('tags', {
          rules: [],
          initialValue: formVals.tags,
        })(<EditableTagGroup value={formVals.tags} ></EditableTagGroup>)}
      </FormItem>,
    ];
  };

  renderFooter = () => {
    const { onCancel: handlecreateModalVisible } = this.props;
    return [
      <Button key="cancel" onClick={() => handlecreateModalVisible(false)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext()}>
        保存
      </Button>,
    ];
  };

  render() {
    const { createModalVisible, onCancel: handlecreateModalVisible } = this.props;
    const { formVals } = this.state;

    return (
      <Modal
        width={1080}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="创建商品"
        visible={createModalVisible}
        footer={this.renderFooter()}
        onCancel={() => handlecreateModalVisible(false)}
        afterClose={() => handlecreateModalVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}

export default Form.create<CreateFormProps>()(CreateForm);
