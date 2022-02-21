import actions from "./actions";

const initState = {
  loading: false,
  status: [],
  names: [],
  chains: [],
  emails: [],
  total: 0,
  chainOptions: [],
  directorOptions: [],
  storeOptions: [],
  chain: {},
};

export default function chainReducer(state = initState, action) {
  switch (action.type) {
    case actions.CHAINS_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case actions.CHAIN_METADATA_SUCCESS:
      return {
        ...state,
        chainOptions: action.chainOptions,
        directorOptions: action.directorOptions,
        storeOptions: action.storeOptions,
      };
    case actions.CHAIN_OPTIONS_SUCCESS:
      return {
        ...state,
        chainOptions: action.chainOptions,
      };
    case actions.CHAINS_SUCCESS:
      return {
        ...state,
        chains: action.chains,
        total: action.total,
        loading: false,
      };
    case actions.CHAIN_SUCCESS:
      return {
        ...state,
        chain: action.chain,
      };
    case actions.RESET_CHAIN_STORE:
      return initState;
    default:
      return state;
  }
}
