import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import { connect } from 'dva';
import BaseView from './components/base';
import styles from './style.less';
import WeiXinView from './components/WeiXinView';
import OppoView from './components/OppoView';
import BiliBiliView from './components/BiliBiliView';
import QQView from './components/QQView';
import TouTiaoView from './components/TouTiaoView';

const { Item } = Menu;
interface AppInfoProps {
  name: string;
  dispatch: Dispatch<any>;
}
type AppInfoStateKeys =
  | 'base'
  | 'notification'
  | 'weixin'
  | 'bilibili'
  | 'oppo'
  | 'qqapp'
  | 'toutiao';
interface AppInfoState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: AppInfoStateKeys;
}

class AppInfo extends Component<AppInfoProps, AppInfoState> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: AppInfoProps) {
    super(props);
    const menuMap = {
      base: '基本设置',
      weixin: '微信配置',
      qqapp: 'QQ配置',
      bilibili: 'B站配置',
      toutiao: '头条配置',
      oppo: 'OPPO配置',
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'base',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'appInfo/fetch',
      payload: this.props.match.params._id,
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: AppInfoStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case 'base':
        return <BaseView />;

      case 'weixin':
        return <WeiXinView />;

      case 'bilibili':
        return <BiliBiliView />;

      case 'oppo':
        return <OppoView />;

      case 'qqapp':
        return <QQView />;

      case 'toutiao':
        return <TouTiaoView />;

      default:
        break;
    }

    return null;
  };

  render() {
    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) => this.selectKey(key as AppInfoStateKeys)}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default connect(({ appInfo }: { appInfo: { name: string } }) => ({
  name: appInfo.name,
}))(AppInfo);
