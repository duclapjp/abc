const actions = {
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  CHECK_AUTHORIZATION_ERROR: "CHECK_AUTHORIZATION_ERROR",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  LOGOUT: "LOGOUT",
  FORGET_PASSWORD_REQUEST: "FORGET_PASSWORD_REQUEST",
  RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR",
  UPDATE_USER_LOGIN: "UPDATE_USER_LOGIN",
  CHAIN_LOGIN_STORE_REQUEST: "CHAIN_LOGIN_STORE_REQUEST",
  CHAIN_LOGIN_STORE_SUCCESS: "CHAIN_LOGIN_STORE_SUCCESS",
  CHAIN_LOGIN_STORE_ERROR: "CHAIN_LOGIN_STORE_ERROR",
  checkAuthorization: (payload) => ({
    type: actions.CHECK_AUTHORIZATION,
    payload,
  }),
  login: (payload) => ({
    type: actions.LOGIN_REQUEST,
    payload: payload,
  }),
  chainLoginStore: (payload) => ({
    type: actions.CHAIN_LOGIN_STORE_REQUEST,
    payload: payload,
  }),
  forgotPassword: (payload) => ({
    type: actions.FORGET_PASSWORD_REQUEST,
    payload: payload,
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
  resetPassword: (payload) => ({
    type: actions.RESET_PASSWORD_REQUEST,
    payload: payload,
  }),
  clearErrors: () => ({
    type: actions.CLEAR_ERROR,
  }),
};
export default actions;
