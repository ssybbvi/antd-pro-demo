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

interface AppInfoBaseViewProps extends FormComponentProps {
  dispatch?: Dispatch<any>;
  _id: string;
  name: string;
}

class AppInfoBaseView extends Component<AppInfoBaseViewProps> {
  view: HTMLDivElement | undefined = undefined;

  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { name, form } = this.props;
    form.setFieldsValue({ name });
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
        payload: { _id, oppoapp: form.getFieldsValue() },
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
            <FormItem label="游戏名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入游戏名称',
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
  name: appInfo.name,
}))(Form.create<AppInfoBaseViewProps>()(AppInfoBaseView));
