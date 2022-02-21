import actions from "./actions";

const initialState = {
  accounts: [],
  account: {},
  total: 0,
  loading: true,
  error: null,
  chains: [],
  stores: [],
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ACCOUNTS_REQUEST:
      return {
        ...state,
        accounts: [],
        account: {},
        loading: true,
      };
    case actions.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.accounts,
        total: action.total,
        loading: false,
      };
    case actions.GET_ACCOUNTS_ERROR:
      return {
        ...state,
        accounts: [],
        total: 0,
        loading: false,
        error: action.error,
      };
    case actions.GET_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: action.account,
      };
    }
    case actions.GET_CHAINS_SUCCESS: {
      return {
        ...state,
        chains: action.chains,
      };
    }
    case actions.GET_STORES_SUCCESS: {
      return {
        ...state,
        stores: action.stores,
      };
    }
    case actions.ADD_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: action.account,
      };
    }
    case actions.EDIT_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: action.account,
      };
    }
    case actions.RESET_ACCOUNTS_STORE: {
      return initialState;
    }
    default:
      return state;
  }
}
