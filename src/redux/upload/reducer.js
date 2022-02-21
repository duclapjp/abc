import actions from "@iso/redux/upload/actions";

const initialState = {
  loading: false,
  error: null,
};

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case actions.MANUAL_UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.MANUAL_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actions.MANUAL_UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
