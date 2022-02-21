import modalActions from "./actions";

const initialState = {
  modalVisibility: false,
  modalType: "",
  modalProps: {},
  modalError: {
    visibility: false,
    type: "",
    props: {},
  },
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case modalActions.SHOW_MODAL:
      return {
        ...state,
        modalVisibility: true,
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    case modalActions.HIDE_MODAL:
      return {
        ...state,
        modalVisibility: false,
        modalType: "",
        modalProps: {},
      };
    case modalActions.SHOW_MODAL_ERROR:
      return {
        ...state,
        modalError: {
          visibility: true,
          type: action.payload.type,
          props: action.payload.props,
        },
      };
    case modalActions.HIDE_MODAL_ERROR:
      return {
        ...state,
        modalError: initialState.modalError,
      };
    default:
      return state;
  }
}
