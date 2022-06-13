import {combineReducers} from 'redux';

const defaultUserInfo = {
  id: 0,
  name: '',
  token: '',
  readOnlyToken: '',
};

const defaultWorkOrder = {
  id: 0,
};

const INITIAL_STATE = {
  userInfo: defaultUserInfo,
  workOrderInfo: defaultWorkOrder,
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
        },
      };
    case 'SET_WORK_ORDER_ID':
      return {
        ...state,
        workOrderInfo: {id: action.id},
      };
    case 'SET_LOGOUT_USER_INFO':
      return {
        ...state,
        INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default combineReducers({
  app: reducers,
});
