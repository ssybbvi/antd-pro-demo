import { Badge, Card, Descriptions, Divider, Table, Buttom, Button, Input, message } from 'antd';
import React, { Component, useState, useRef } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { OrderDataDtoType, ShippedParams } from './data.d';
import styles from './style.less';
import { showStatusName } from '../OrderList/data';
import AuditForm from './components/AuditForm';
import { shipped, received } from './service';
import { ActionType } from '@ant-design/pro-table';

// const progressColumns = [
//   {
//     title: '时间',
//     dataIndex: 'time',
//     key: 'time',
//   },
//   {
//     title: '当前进度',
//     dataIndex: 'rate',
//     key: 'rate',
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     key: 'status',
//     render: (text: string) => {
//       if (text === 'success') {
//         return <Badge status="success" text="成功" />;
//       }
//       return <Badge status="processing" text="进行中" />;
//     },
//   },

//   {
//     title: '操作员ID',
//     dataIndex: 'operator',
//     key: 'operator',
//   },
//   {
//     title: '耗时',
//     dataIndex: 'cost',
//     key: 'cost',
//   },
// ];


/**
 * 添加节点
 * @param fields
 */
const Shipped = async (fields: ShippedParams) => {
  const hide = message.loading('正在提交');
  try {
    await shipped(fields);
    hide();
    message.success('添加提交');
    return true;
  } catch (error) {
    hide();
    message.error('提交失败请重试！');
    return false;
  }
};

const Received = async (orderId: string) => {
  const hide = message.loading('正在提交');
  try {
    await received(orderId);
    hide();
    message.success('添加提交');
    return true;
  } catch (error) {
    hide();
    message.error('提交失败请重试！');
    return false;
  }
};




interface OrderDetailsProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  orderDetails: OrderDataDtoType;
}
interface OrderDetailsState {
  visible: boolean;
  auditModal: boolean
}

class OrderDetails extends Component<
  OrderDetailsProps,
  OrderDetailsState
  > {

  state: OrderDetailsState = {
    visible: false,
    auditModal: false
  }

  componentDidMount() {
    this.loadInfo()
  }

  loadInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetails/fetchBasic',
      payload: this.props.match.params.orderId
    });
  }

  handleModalVisible = (auditModal: boolean) => {
    this.setState({
      auditModal
    })
  }



  render() {
    const { orderDetails, loading } = this.props;
    const { items } = orderDetails;
    const { auditModal } = this.state

    const goodsColumns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: (text: React.ReactNode, row: any, index: number) => {
          return text
        },
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        render: (text: React.ReactNode, row: any, index: number) => {
          return text
        }
      },
    ];

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
      <PageHeaderWrapper>
        <Card bordered={false}>

          <Descriptions title="订单详情" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="价格">{orderDetails.price}</Descriptions.Item>
            <Descriptions.Item label="订单编号">{orderDetails.code}</Descriptions.Item>
            <Descriptions.Item label="状态">{showStatusName(orderDetails.status)}</Descriptions.Item>
            <Descriptions.Item label="备注">{orderDetails.remark}</Descriptions.Item>
            <Descriptions.Item label="支付时间">{orderDetails.paymentTime}</Descriptions.Item>
            <Descriptions.Item label="发货时间">{orderDetails.shippingTime}</Descriptions.Item>
            <Descriptions.Item label="下单时间">{orderDetails.createAt}</Descriptions.Item>
            <Descriptions.Item label="收货时间">{orderDetails.finishTime}</Descriptions.Item>
            <Descriptions.Item label="取消时间">{orderDetails.cancelTime}</Descriptions.Item>
            <Descriptions.Item label="快递方式">{orderDetails.shippingType}</Descriptions.Item>
            <Descriptions.Item label="快递单号">{orderDetails.shippingNumber}</Descriptions.Item>
          </Descriptions>

          <Descriptions title="收货信息" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="收件人姓名">{orderDetails.userName}</Descriptions.Item>
            <Descriptions.Item label="手机号">{orderDetails.telNumber}</Descriptions.Item>
            <Descriptions.Item label="国家">{orderDetails.countyName}</Descriptions.Item>
            <Descriptions.Item label="省份">{orderDetails.provinceName}</Descriptions.Item>
            <Descriptions.Item label="城市">{orderDetails.cityName}</Descriptions.Item>
            <Descriptions.Item label="地址">{orderDetails.detailAddressInfo}</Descriptions.Item>
            <Descriptions.Item label="nationalCode">{orderDetails.nationalCode}</Descriptions.Item>
          </Descriptions>


          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>商品列表</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={items}
            columns={goodsColumns}
            rowKey="id"
          />
          {/* <div className={styles.title}>审核进度</div> */}
          {/* <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          /> */}

        </Card>

        {orderDetails.status === "shipping" ? <Card bordered={false}>
          <Button type="primary" onClick={() => {
            this.handleModalVisible(true)
          }} >发货</Button>
        </Card> : null}

        {orderDetails.status === "shipped" ?
          <Card bordered={false}>
            <Button type="primary" onClick={async () => {
              const success = await Received(this.props.match.params.orderId)
              if (success) {
                this.loadInfo()
              }
            }}>确认收货</Button>
          </Card> : null}




        <AuditForm
          onSubmit={async (value: any) => {
            value.orderId = this.props.match.params.orderId
            const success = await Shipped(value);
            if (success) {
              this.handleModalVisible(false);
              this.loadInfo()
            }
          }}
          onCancel={() => this.handleModalVisible(false)}
          AuditModalVisible={auditModal}
        />
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    orderDetails,
    loading,
  }: {
    orderDetails: OrderDataDtoType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    orderDetails,
    loading: loading.effects['orderDetails/fetchBasic'],
  }),
)(OrderDetails);
