import actions from "@iso/redux/store/actions";

const initialState = {
  stores: [],
  directors: [],
  selectStores: [],
  total: 0,
  loading: true,
  error: null,
  otas: [],
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_STORES_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_STORES_DATA_SUCCESS:
      return {
        ...state,
        stores: action.stores,
        total: action.total,
        loading: false,
      };
    case actions.GET_STORES_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.GET_STORES_METADATA_REQUEST:
      return {
        ...state,
      };
    case actions.GET_STORES_METADATA_SUCCESS:
      return {
        ...state,
        directors: action.directors,
        selectStores: action.selectStores,
      };
    case actions.GET_STORES_METADATA_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.GET_STORE_OTAS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_STORE_OTAS_SUCCESS:
      return {
        ...state,
        otas: action.otas,
        loading: false,
      };
    case actions.RESET_STORES_STORE:
      return initialState;
    default:
      return state;
  }
}
