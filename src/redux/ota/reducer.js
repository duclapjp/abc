import actions from "./actions";

const initialState = {
  requesting: false,
  requestingTypes: false,
  updateRequesting: false,
  ota: {},
  otas: [],
  otaTypes: [],
  total: 0,
  error: null,
};

export default function otaListReducer(state = initialState, action) {
  const { otas, total, error, otaTypes, ota } = action;

  switch (action.type) {
    case actions.GET_OTAS_REQUEST:
      return {
        ...state,
        requesting: true,
        otas: [],
        total: 0,
        error: null,
      };
    case actions.GET_OTAS_SUCCESS:
      return {
        ...state,
        requesting: false,
        otas,
        total,
        error: null,
      };
    case actions.UPDATE_OTA_STATUS_REQUEST:
      return {
        ...state,
        requesting: true,
        error: null,
      };
    case actions.UPDATE_OTA_STATUS_SUCCESS:
      return {
        ...state,
        requesting: false,
        otas,
        total,
        error: null,
      };
    case actions.UPDATE_OTA_STATUS_ERROR:
      return {
        ...state,
        requesting: false,
        error,
      };
    case actions.GET_OTA_TYPES_REQUEST:
      return {
        ...state,
        requestingTypes: true,
        otaTypes: [],
        error: null,
      };
    case actions.GET_OTA_TYPES_SUCCESS:
      return {
        ...state,
        requestingTypes: false,
        otaTypes,
        error: null,
      };
    case actions.GET_OTA_REQUEST:
      return {
        ...state,
        requesting: true,
        ota: {},
        error: null,
      };
    case actions.GET_OTA_SUCCESS:
      return {
        ...state,
        requesting: false,
        ota,
        error: null,
      };
    case actions.UPDATE_OTA_REQUEST:
      return {
        ...state,
        updateRequesting: true,
        error: null,
      };
    case actions.UPDATE_OTA_SUCCESS:
      return {
        ...state,
        updateRequesting: false,
        error: null,
      };
    default:
      return state;
  }
}
