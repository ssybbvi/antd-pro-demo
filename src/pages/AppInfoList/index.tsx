/* eslint-disable no-underscore-dangle */

import { Button, Form, Icon, Menu, Dropdown, message } from 'antd';
import React, { useRef } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Link } from 'umi';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { queryRule, addRule, updateRule } from './service';
import { TableListItem } from '../ListPermission/data';

interface TableListProps extends FormComponentProps {}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({
      desc: fields.desc,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const TableList: React.FC<TableListProps> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '注册人数',
      dataIndex: 'registerCounnt',
      renderText: (val: string) => `${val}人`,
    },
    {
      title: '预警阈值',
      dataIndex: 'earlyWarningThreshold',
      sorter: true,
      renderText: (val: string) => `${val}人`,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Link to={`/appinfo/${record._id}`}>
            <Icon type="pie-chart" />
            <span>编辑</span>
          </Link>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="游戏列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        request={params => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
