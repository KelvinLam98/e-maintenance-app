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

export const setWorkOrderSampleId = values => ({
  type: 'SET_WORK_ORDER_SAMPLE_ID',
  ...values,
});

export const setPushToken = token => ({
  type: 'SET_PUSH_TOKEN',
  payload: token,
});
