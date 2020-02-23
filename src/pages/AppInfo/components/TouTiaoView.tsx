import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, message } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ModalState } from '../model';
import styles from './BaseView.less';

const FormItem = Form.Item;

interface TouTiaoViewProps extends FormComponentProps {
  dispatch?: Dispatch<any>;
  _id: string;
  ttapp?: {
    appId: string;
    secret: string;
  };
}

class TouTiaoView extends Component<TouTiaoViewProps> {
  view: HTMLDivElement | undefined = undefined;

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { ttapp, form } = this.props;
    if (ttapp) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = ttapp[key] || null;
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
        payload: { _id, ttapp: form.getFieldsValue() },
      });
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout="vertical" hideRequiredMark>
            <FormItem label="appId">
              {getFieldDecorator('appId', {
                rules: [
                  {
                    required: true,
                    message: '请输入AppId',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="secret">
              {getFieldDecorator('secret', {
                rules: [
                  {
                    required: true,
                    message: '请输入secret',
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
  ttapp: appInfo.platform.ttapp,
}))(Form.create<TouTiaoViewProps>()(TouTiaoView));
