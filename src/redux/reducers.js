import {combineReducers} from 'redux';

const INITIAL_STATE = {
  id: 0,
  name: '',
  token: '',
  readOnlyToken: '',
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        id: action.id,
        name: action.name,
        token: action.token,
        readOnlyToken: action.readOnlyToken,
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
