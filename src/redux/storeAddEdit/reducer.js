import actions from "./actions";

const initialState = {
  store: {},
  loading: false,
  loadingMetaData: false,
  error: null,
  chains: [],
  directors: [],
  otaOptionData: [],
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_STORE_DETAIL_REQUEST: {
      return {
        ...state,
        store: {},
        loading: true,
      };
    }
    case actions.GET_STORE_DETAIL_SUCCESS: {
      return {
        ...state,
        store: action.store,
        loading: false,
      };
    }
    case actions.GET_STORE_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case actions.GET_STORE_METADATA_REQUEST: {
      return {
        ...state,
        loadingMetaData: true,
        chains: [],
        directors: [],
        otaOptionData: [],
      };
    }
    case actions.GET_STORE_METADATA_SUCCESS: {
      return {
        ...state,
        chains: action.chains,
        directors: action.directors,
        otaOptionData: action.otaOptionData,
        loadingMetaData: false,
      };
    }
    case actions.GET_STORE_METADATA_ERROR: {
      return {
        ...state,
        loadingMetaData: false,
      };
    }
    case actions.ADD_STORE_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }
    case actions.ADD_STORE_SUCCESS: {
      return {
        ...state,
        loading: false,
        store: action.store,
      };
    }
    case actions.ADD_STORE_ERROR: {
      return {
        loading: false,
        ...state,
      };
    }
    case actions.EDIT_STORE_REQUEST: {
      return {
        ...state,
      };
    }
    case actions.EDIT_STORE_SUCCESS: {
      return {
        ...state,
        store: action.store,
      };
    }
    case actions.EDIT_STORE_ERROR: {
      return {
        ...state,
      };
    }
    case actions.RESET_STORE_ADD_EDIT_STORE: {
      return initialState;
    }
    case actions.UPDATE_EXPIRED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.UPDATE_EXPIRED_SUCCESS:
      return {
        ...state,
        store: action.store,
        loading: false,
      };
    case actions.UPDATE_EXPIRED_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
