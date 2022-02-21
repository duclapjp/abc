const modalActions = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
  SHOW_MODAL_ERROR: "SHOW_MODAL_ERROR",
  HIDE_MODAL_ERROR: "HIDE_MODAL_ERROR",

  openModal: (payload) => ({
    type: modalActions.SHOW_MODAL,
    payload,
  }),
  closeModal: () => ({
    type: modalActions.HIDE_MODAL,
  }),
  openModalError: (payload) => ({
    type: modalActions.SHOW_MODAL_ERROR,
    payload,
  }),
  closeModalError: () => ({
    type: modalActions.HIDE_MODAL,
  }),
};

export default modalActions;
