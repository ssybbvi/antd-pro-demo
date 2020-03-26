import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { query as queryAppInfo, edit } from './service';

export interface ModalState {
  _id: string;
  name: string;

  platform: {
    weapp?: {
      appId: string;
      secret: string;
    };
    qqapp?: {
      appId: string;
      secret: string;
    };
    ttapp?: {
      appId: string;
      secret: string;
    };
    baiduapp?: {
      appId: string;
      appKey: string;
      secret: string;
    };
    biliapp?: {
      appId: string;
      appKey: string;
      secret: string;
    };
    oppoapp?: {
      appKey: string;
      secret: string;
      pkgName: string;
    };
  };

  registerNotification?: {
    earlyWarningThreshold: number; // 预警阈值
    phones: string[]; // 通知的手机号码
  };

  userTotal: number;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ModalState) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: ModalState;
  effects: {
    fetch: Effect;
    edit: Effect;
  };
  reducers: {
    setAppInfo: Reducer<ModalState>;
  };
}

const Model: ModelType = {
  namespace: 'appInfo',

  state: {
    _id: '',
    name: '',

    platform: {
      weapp: {
        appId: '',
        secret: '',
      },
      qqapp: {
        appId: '',
        secret: '',
      },
      ttapp: {
        appId: '',
        secret: '',
      },
      baiduapp: {
        appId: '',
        appKey: '',
        secret: '',
      },
      biliapp: {
        appId: '',
        appKey: '',
        secret: '',
      },
      oppoapp: {
        appKey: '',
        secret: '',
        pkgName: '',
      },
    },

    registerNotification: {
      earlyWarningThreshold: 0, // 预警阈值
      phones: [], // 通知的手机号码
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAppInfo, payload);
      console.log('zzzzz', response);
      yield put({
        type: 'setAppInfo',
        payload: response.data,
      });
    },
    *edit({ payload }, { call, put }) {
      yield call(edit, payload);
      console.log('xxxxxx123', payload);
      yield put({
        type: 'fetch',
        payload: payload._id,
      });
    },
  },

  reducers: {
    setAppInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default Model;
