const actions = {
  CONFIRM_EMAIL_REQUEST: "CONFIRM_EMAIL_REQUEST",
  CONFIRM_EMAIL_SUCCESS: "CONFIRM_EMAIL_SUCCESS",
  CONFIRM_EMAIL_ERROR: "CONFIRM_EMAIL_ERROR",
  confirmEmail: (payload) => ({
    type: actions.CONFIRM_EMAIL_REQUEST,
    payload: payload,
  }),
};
export default actions;
