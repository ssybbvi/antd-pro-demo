import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { OrderDataDtoType } from './data.d';
import styles from './style.less';

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

interface OrderDetailsProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  orderDetails: OrderDataDtoType;
}
interface OrderDetailsState {
  visible: boolean;
}

class OrderDetails extends Component<
  OrderDetailsProps,
  OrderDetailsState
  > {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'orderDetails/fetchBasic',
      payload: this.props.match.params.orderId
    });
  }

  render() {
    const { orderDetails, loading } = this.props;
    const { items } = orderDetails;

    const renderContent = (value: any, row: any, index: any) => {
      const obj: {
        children: any;
        props: { colSpan?: number };
      } = {
        children: value,
        props: {},
      };
      if (index === items.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
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
        align: 'right' as 'left' | 'right' | 'center',
        render: renderContent,
      },
    ];
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>

          <Descriptions title="订单详情" style={{ marginBottom: 32 }}>
            <Descriptions.Item label="价格">{orderDetails.price}</Descriptions.Item>
            <Descriptions.Item label="订单编号">{orderDetails.code}</Descriptions.Item>
            <Descriptions.Item label="状态">{orderDetails.status}</Descriptions.Item>
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
