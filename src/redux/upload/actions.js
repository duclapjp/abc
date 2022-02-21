const actions = {
  MANUAL_UPLOAD_REQUEST: "MANUAL_UPLOAD_REQUEST",
  MANUAL_UPLOAD_SUCCESS: "MANUAL_UPLOAD_SUCCESS",
  MANUAL_UPLOAD_ERROR: "MANUAL_UPLOAD_ERROR",

  fileUpload: (payload) => ({
    type: actions.MANUAL_UPLOAD_REQUEST,
    payload: payload,
  }),
};

export default actions;
