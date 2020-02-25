/* eslint-disable no-underscore-dangle */
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Modal, Checkbox, Row } from 'antd';

import { FormComponentProps } from '@ant-design/compatible/es/form';
import React, { useState } from 'react';
import { TableListItem } from '@/pages/ListPermission/data';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { name: string; description: string }) => void;
  onCancel: () => void;
  permissionList: TableListItem[];
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel, permissionList } = props;

  const [permissionIds, setRolePermissionList] = useState([]);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd({ ...fieldsValue, permissionIds });
    });
  };

  const onChange = (checkedValues: any) => {
    setRolePermissionList(checkedValues);
  };

  return (
    <Modal
      destroyOnClose
      title="新建角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入！', min: 1 }],
        })(<Input placeholder="请输入角色标示" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色描述">
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: '请输入！', min: 1 }],
        })(<Input placeholder="请输入角色描述" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限标示">
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
          <Row>
            {permissionList.map((item: any) => (
              <Checkbox value={item._id} key={item._id}>
                {item.name}
              </Checkbox>
            ))}
          </Row>
        </Checkbox.Group>
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
