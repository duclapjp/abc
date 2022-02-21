import actions from "./actions";

const initState = {
  user: {},
  loading: false,
};

export default function reduxSagaReducer(state = initState, { type, user, error }) {
  switch (type) {
    case actions.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user,
      };
    case actions.GET_CURRENT_USER_ERROR:
      return {
        ...state,
        error,
      };
    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user,
      };
    case actions.UPDATE_USER_ERROR:
      return {
        ...state,
        error,
      };
    case actions.RESET_ACCOUNT_SETTING_STORE:
      return initState;
    default:
      return state;
  }
}
