import actions from "./actions";

const initialState = {
  loading: true,
  loadingMetaData: true,
  show: false,
  error: null,
  total: 0,
  passwordHistories: [],
  OTAs: [],
  updaters: [],
};

export default function passwordHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_PASSWORD_HISTORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        total: 0,
        passwordHistories: [],
      };
    case actions.GET_PASSWORD_HISTORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        total: action.total,
        passwordHistories: action.passwordHistories,
      };
    case actions.GET_METADATA_PASSWORD_HISTORY_REQUEST:
      return {
        ...state,
        loadingMetaData: true,
        error: null,
        OTAs: [],
        updaters: [],
      };
    case actions.GET_METADATA_PASSWORD_HISTORY_SUCCESS:
      return {
        ...state,
        loadingMetaData: false,
        error: null,
        OTAs: action.OTAs,
        updaters: action.updaters,
      };
    case actions.GET_METADATA_PASSWORD_HISTORY_ERROR:
      return {
        ...state,
        loadingMetaData: false,
        error: action.error,
        OTAs: [],
        updaters: [],
      };
    case actions.TOGGLE_PASSWORD_HISTORY:
      return {
        ...state,
        show: !state.show,
      };
    case actions.RESET_PASSWORD_HISTORY_STORE:
      return initialState;
    default:
      return state;
  }
}
