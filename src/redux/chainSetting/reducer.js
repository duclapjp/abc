import actions from "./actions";

const initialState = {
  chain: {},
};
export default function reduxSagaReducer(
  state = initialState,
  { type, chain, error }
) {
  switch (type) {
    case actions.GET_CHAIN_SUCCESS:
      return {
        ...state,
        chain,
      };
    case actions.GET_CHAIN_ERROR:
      return {
        ...state,
        error,
      };
    case actions.UPDATE_CHAIN_SUCCESS:
      return {
        ...state,
        chain,
      };
    case actions.UPDATE_CHAIN_ERROR:
      return {
        ...state,
        error,
      };
    case actions.RESET_CHAIN_SETTING_STORE:
      return initialState;
    default:
      return state;
  }
}
