import {combineReducers} from 'redux';

const INITIAL_STATE = {
  id: 0,
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        id: action.id,
      };
    case 'SET_LOGOUT_USER_INFO':
      return {
        ...state,
        userInfo: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  app: reducers,
});
