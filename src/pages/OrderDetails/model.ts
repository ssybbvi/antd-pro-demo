import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { OrderDataDtoType } from './data.d';
import { getOrderDetails } from './service';

export interface StateType {
  order: OrderDataDtoType
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasic: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'orderDetails',

  state: {
    order: {
      _id: "",
      userId: "",
      createAt: 0,
      status: "",
      price: 0,
      remark: "",
      code: "",

      userName: "",
      provinceName: "",
      cityName: "",
      countyName: "",
      detailAddressInfo: "",
      nationalCode: "",
      telNumber: "",

      items: []
    },
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(getOrderDetails, payload);
      yield put({
        type: 'show',
        payload: response.data,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
