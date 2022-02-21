import _ from "lodash";

import actions from "./actions";

const initialState = {
  notifications: [],
  error: null,
  showModal: false,
  loading: true,
  total: 0,
};

export default function getNotification(state = initialState, action) {
  switch (action.type) {
    case actions.GET_NOTIFY_REQUEST:
      return {
        ...state,
        loading: true,
        notifications: [],
      };
    case actions.GET_NOTIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        ..._.pick(action, ["notifications", "total"]),
      };
    case actions.GET_NOTIFY_ERROR:
      return {
        ...state,
        notifications: [],
        loading: false,
        ..._.pick(action, ["error"]),
      };
    case actions.UPDATE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        ..._.pick(action, ["notifications", "total"]),
      };
    case actions.TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      };
    default:
      return state;
  }
}
