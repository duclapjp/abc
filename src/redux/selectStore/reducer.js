import actions from "@iso/redux/selectStore/actions";

const initialState = {
  loading: true,
  loadingMetaData: true,
  show: false,
  error: null,
  errorMetaData: null,
  stores: [],
  directors: [],
  chains: [],
};

export default function selectStoreReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_STORES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        stores: [],
      };
    case actions.FETCH_STORES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        stores: action.stores,
      };
    case actions.FETCH_STORES_ERROR:
      return {
        ...state,
        loading: false,
        stores: [],
        error: action.error,
      };
    case actions.FETCH_METADATA_SELECT_STORE_REQUEST:
      return {
        ...state,
        loadingMetaData: true,
        errorMetaData: null,
        directors: [],
        chains: [],
      };
    case actions.FETCH_METADATA_SELECT_STORE_SUCCESS:
      return {
        ...state,
        loadingMetaData: false,
        errorMetaData: null,
        directors: action.directors,
        chains: action.chains,
      };
    case actions.FETCH_METADATA_SELECT_STORE_ERROR:
      return {
        ...state,
        loadingMetaData: false,
        directors: [],
        chains: [],
        errorMetaData: action.error,
      };
    case actions.TOGGLE_SELECT_STORE:
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state;
  }
}
