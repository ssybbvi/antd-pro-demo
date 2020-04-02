import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Select,
  Result,
  Icon,
} from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { StateType } from './model';
import { BasicListItemDataType } from './data.d';
import styles from './style.less';
import { Link } from 'umi';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

interface OrderListProps extends FormComponentProps {
  orderList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface OrderListState {
  visible: boolean;
  done: boolean;
  current?: Partial<BasicListItemDataType>;
}

class OrderList extends Component<
  OrderListProps,
  OrderListState
  > {
  state: OrderListState = { visible: false, done: false, current: undefined };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  addBtn: HTMLButtonElement | undefined | null = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'orderList/fetch',
      payload: {
        count: 5,
      },
    });
  }


  render() {
    const {
      orderList: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;



    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="unpaid">未支付</RadioButton>
          <RadioButton value="shipping">待发货</RadioButton>
          <RadioButton value="shipped">已发货</RadioButton>
          <RadioButton value="received">已完成</RadioButton>
          <RadioButton value="cancel">已取消</RadioButton>
        </RadioGroup>
        {/* <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} /> */}
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const GetTimeByStatus = ({
      data: { createAt, paymentTime, shippingTime, finishTime, status, cancelTime },
    }: {
      data: BasicListItemDataType;
    }) => {
      if (status === "unpaid") {
        return (
          <div className={styles.listContentItem}>
            <span>下单时间</span>
            <p>{moment(createAt).format('YYYY-MM-DD HH:mm')}</p>
          </div>
        )
      }

      if (status === "shipping") {
        return (
          <div className={styles.listContentItem}>
            <span>支付时间</span>
            <p>{moment(paymentTime).format('YYYY-MM-DD HH:mm')}</p>
          </div>
        )
      }

      if (status === "shipped") {
        return (
          <div className={styles.listContentItem}>
            <span>发货时间</span>
            <p>{moment(shippingTime).format('YYYY-MM-DD HH:mm')}</p>
          </div>
        )
      }

      if (status === "received") {
        return (
          <div className={styles.listContentItem}>
            <span>收货时间</span>
            <p>{moment(finishTime).format('YYYY-MM-DD HH:mm')}</p>
          </div>
        )
      }

      if (status === "cancel") {
        return (
          <div className={styles.listContentItem}>
            <span>取消时间</span>
            <p>{moment(cancelTime).format('YYYY-MM-DD HH:mm')}</p>
          </div>
        )
      }
    }

    const ListContent = ({
      data
    }: {
      data: BasicListItemDataType;
    }) => (
        <div className={styles.listContent}>
          <div className={styles.listContentItem}>
            <span>订单号</span>
            <p>{data.code}</p>
          </div>
          <div className={styles.listContentItem}>
            <span>订单状态</span>
            <p>{showStatusName(data.status)}</p>
          </div>
          <GetTimeByStatus data={data} />
        </div>
      );

    const showStatusName = (status: string) => {
      if (status === "unpaid") {
        return "未支付"
      }

      if (status === "shipping") {
        return "待发货"
      }

      if (status === "shipped") {
        return "已发货"
      }

      if (status === "received") {
        return "已完成"
      }

      if (status === "cancel") {
        return "已取消"
      }

      return "未知"
    }


    return (
      <>
        <PageHeaderWrapper>
          <div className={styles.standardList}>
            {/* <Card bordered={false}>
              <Row>
                <Col sm={8} xs={24}>
                  <Info title="我的待办" value="8个任务" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="本周任务平均处理时间" value="32分钟" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="本周完成任务数" value="24个任务" />
                </Col>
              </Row>
            </Card> */}

            <Card
              className={styles.listCard}
              bordered={false}
              title="基本列表"
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: '0 32px 40px 32px' }}
              extra={extraContent}
            >
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={paginationProps}
                dataSource={list}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Link to={`/orderdetails/${item._id}`}>
                        <span>审核</span>
                      </Link>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.items[0].image} shape="square" size="large" />}
                      title={<a href={``}>{item.items[0].name}</a>}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default connect(
  ({
    orderList,
    loading,
  }: {
    orderList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    orderList,
    loading: loading.models.orderList,
  }),
)(Form.create<OrderListProps>()(OrderList));
