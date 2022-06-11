export const setUserInfo = values => ({
  type: 'SET_USER_INFO',
  ...values,
});

export const setLogoutUserInfo = () => ({
  type: 'SET_LOGOUT_USER_INFO',
});
