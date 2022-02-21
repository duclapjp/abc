import actions from "@iso/redux/planAmount/actions";

const initialState = {
  amountRank: {},
  amountGroups: {},
  numberPeople: null,
  amountGroup: {},
  loading: true,
  loadingDefaultPlan: true,
  error: null,
  items: [],
  defaultPlans: [],
  defaultPlan: {},
};

export default function planAmountReducer(state = initialState, action) {
  switch (action.type) {
    /** TASK_TEMPLATE */
    case actions.GET_TASK_TEMPLATES_REQUEST:
      return {
        ...state,
        loadingDefaultPlan: true,
        items: [],
      };

    case actions.GET_TASK_TEMPLATES_SUCCESS:
      return {
        ...state,
        loadingDefaultPlan: false,
        items: action.items,
      };

    /** DEFAULT_PLAN */
    case actions.GET_DEFAULT_PLANS_REQUEST:
      return {
        ...state,
        defaultPlans: [],
        loadingDefaultPlan: true,
      };

    case actions.GET_DEFAULT_PLANS_SUCCESS:
      return {
        ...state,
        defaultPlans: action.defaultPlans,
        loadingDefaultPlan: false,
      };

    case actions.GET_DEFAULT_PLAN_REQUEST:
      return {
        ...state,
        loadingDefaultPlan: true,
        defaultPlan: {},
      };

    case actions.GET_DEFAULT_PLAN_SUCCESS:
      return {
        ...state,
        loadingDefaultPlan: false,
        defaultPlan: action.defaultPlan,
      };

    case actions.CREATE_DEFAULT_PLAN_REQUEST:
      return {
        ...state,
      };

    case actions.CREATE_DEFAULT_PLAN_SUCCESS:
      return {
        ...state,
      };

    case actions.UPDATE_DEFAULT_PLAN_REQUEST:
      return {
        ...state,
      };

    case actions.UPDATE_DEFAULT_PLAN_SUCCESS:
      return {
        ...state,
      };

    case actions.REORDER_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actions.REORDER_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        defaultPlans: action.defaultPlans,
      };

    /** AMOUNT_RANK */
    case actions.AMOUNT_RANK_GET_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        amountRank: {},
        error: null,
      };

    case actions.AMOUNT_RANK_GET_DATA_SUCCESS:
      return {
        ...state,
        amountRank: action.amountRank,
        loading: false,
        error: null,
      };

    case actions.AMOUNT_RANK_GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        amountRank: {},
      };

    case actions.AMOUNT_RANK_UPDATE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actions.AMOUNT_RANK_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        amountRank: action.amountRank,
      };

    case actions.AMOUNT_RANK_UPDATE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.AMOUNT_GROUP_GET_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.AMOUNT_GROUP_GET_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.AMOUNT_GROUP_GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        amountGroups: action.amountGroups,
      };
    case actions.AMOUNT_GROUP_GET_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        amountGroup: action.itemEditing,
        numberPeople: action.itemEditing.totalPeople,
      };
    case actions.AMOUNT_GROUP_GET_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.AMOUNT_GROUP_UPDATE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.AMOUNT_GROUP_UPDATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        amountGroups: action.amountGroups,
      };
    case actions.AMOUNT_GROUP_UPDATE_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.AMOUNT_GROUP_ADD_EDIT_DATA_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case actions.AMOUNT_GROUP_ADD_EDIT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        amountGroup: action.amountGroup,
        numberPeople: action.amountGroup.totalPeople,
      };
    case actions.AMOUNT_GROUP_ADD_EDIT_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.RESET_PLAN_AMOUNT:
      return initialState;
    default:
      return state;
  }
}
