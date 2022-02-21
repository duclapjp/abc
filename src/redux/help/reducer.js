import actions from "@iso/redux/help/actions";

const initialState = {
  stores: [],
  store: {},
  error: null,
  fileExist: false,
  loading: true,
};

export default function helpReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DATA_HELP_CHAIN_REQUEST:
      return {
        ...state,
        stores: [],
        loading: true,
        error: null,
      };
    case actions.GET_DATA_HELP_STORE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_DATA_HELP_CHAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        stores: action.stores,
      };
    case actions.GET_DATA_HELP_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        store: action.store,
      };
    case actions.GET_DATA_HELP_ERROR:
      return {
        ...state,
        stores: [],
        loading: false,
        error: action.error,
      };
    case actions.GET_FILE_REQUEST:
      return {
        ...state,
        fileExist: {},
        error: null,
      };
    case actions.GET_FILE_SUCCESS:
      return {
        ...state,
        fileExist: action.fileExist,
      };
    case actions.GET_FILE_ERROR:
      return {
        ...state,
        fileExist: {},
        error: action.error,
      };
    default:
      return state;
  }
}
