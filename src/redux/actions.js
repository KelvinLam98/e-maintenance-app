export const setUserInfo = values => ({
  type: 'SET_USER_INFO',
  ...values,
});

export const setLogoutUserInfo = () => ({
  type: 'SET_LOGOUT_USER_INFO',
});

export const setWorkOrderId = values => ({
  type: 'SET_WORK_ORDER_ID',
  ...values,
});
