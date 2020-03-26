import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, message, InputNumber } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { format } from 'prettier';
import { ModalState } from '../model';
import styles from './BaseView.less';

const FormItem = Form.Item;

interface NotificationViewProps extends FormComponentProps {
  dispatch?: Dispatch<any>;
  _id: string;
  registerNotification?: {
    earlyWarningThreshold: number; // 预警阈值
    phones: string[]; // 通知的手机号码
  };
  userTotal: number;
}

class NotificationView extends Component<NotificationViewProps> {
  view: HTMLDivElement | undefined = undefined;

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { registerNotification, form } = this.props;
    if (registerNotification) {
      registerNotification.phoneList = registerNotification.phones.join(',');
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = registerNotification[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handlerSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const { _id, form, dispatch } = this.props;
    form.validateFields(err => {
      if (!err) {
        message.success('保存');
      }
    });
    if (dispatch) {
      dispatch({
        type: 'appInfo/edit',
        payload: {
          _id,
          registerNotification: {
            earlyWarningThreshold: form.getFieldValue('earlyWarningThreshold'),
            phones: form.getFieldValue('phoneList').split(','),
          },
        },
      });
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      userTotal,
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>
            <FormItem label="注册用户数">{userTotal}人</FormItem>
            <FormItem label="预警人数(预警人数为0指关闭预警，当注册人数大于预警人数会收到预警)">
              {getFieldDecorator('earlyWarningThreshold', {
                rules: [
                  {
                    required: true,
                    message: '请输入需要预警的人数',
                  },
                ],
              })(<InputNumber min={0} />)}
            </FormItem>
            <FormItem label="收预警的手机号码">
              {getFieldDecorator('phoneList', {
                rules: [
                  {
                    required: true,
                    message: '请输入手机号码，逗号隔开',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <Button type="primary" onClick={this.handlerSubmit}>
              保存
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(({ appInfo }: { appInfo: ModalState }) => ({
  // eslint-disable-next-line no-underscore-dangle
  _id: appInfo._id,
  registerNotification: appInfo.registerNotification,
  userTotal: appInfo.userTotal,
}))(Form.create<NotificationViewProps>()(NotificationView));
