const actions = {
  GET_NOTIFY_REQUEST: "NOTIFY/GET_NOTIFY_REQUEST",
  GET_NOTIFY_SUCCESS: "NOTIFY/GET_NOTIFY_SUCCESS",
  GET_NOTIFY_ERROR: "NOTIFY/GET_NOTIFY_ERROR",

  UPDATE_STATUS_REQUEST: "NOTIFY/UPDATE_STATUS_REQUEST",
  UPDATE_STATUS_SUCCESS: "NOTIFY/UPDATE_STATUS_SUCCESS",
  UPDATE_STATUS_ERROR: "NOTIFY/UPDATE_STATUS_ERROR",

  TOGGLE_MODAL: "NOTIFY/TOOGLE_MODAL",

  getNotify: (payload) => ({
    type: actions.GET_NOTIFY_REQUEST,
    payload,
  }),

  toggleModal: () => ({
    type: actions.TOGGLE_MODAL,
  }),

  updateStatus: (payload) => ({
    type: actions.UPDATE_STATUS_REQUEST,
    payload,
  }),
};

export default actions;
