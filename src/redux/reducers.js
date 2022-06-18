import {combineReducers} from 'redux';

const defaultUserInfo = {
  id: 0,
  name: '',
  token: '',
  readOnlyToken: '',
  ic_number: '',
  contact_number: '',
  address: '',
  email: '',
};

const defaultWorkOrder = {
  id: 0,
  status: '',
  maintenance_date: null,
  maintenance_time: '',
};

const defaultWorkOrderSample = {
  id: 0,
};

const defaultPushToken = {
  pushToken: null,
};

const INITIAL_STATE = {
  userInfo: defaultUserInfo,
  workOrderInfo: defaultWorkOrder,
  workOrderSampleInfo: defaultWorkOrderSample,
  pushTokenInfo: defaultPushToken,
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: {
          id: action.id,
          name: action.name,
          token: action.token,
          readOnlyToken: action.readOnlyToken,
          ic_number: action.ic_number,
          contact_number: action.contact_number,
          address: action.address,
          email: action.email,
        },
      };
    case 'SET_WORK_ORDER_ID':
      return {
        ...state,
        workOrderInfo: {
          id: action.id,
          status: action.status,
          maintenance_date: action.maintenance_date,
          maintenance_time: action.maintenance_time,
        },
      };
    case 'SET_WORK_ORDER_SAMPLE_ID':
      return {
        ...state,
        workOrderSampleInfo: {id: action.id},
      };
    case 'SET_PUSH_TOKEN':
      return {
        ...state,
        pushTokenInfo: {pushToken: action.payload},
      };
    case 'SET_LOGOUT_USER_INFO':
      return {
        ...state,
        userInfo: defaultUserInfo,
      };
    default:
      return state;
  }
};

export default combineReducers({
  app: reducers,
});
