import actions from "./actions";

const initialState = {
  tasks: [],
  assignees: [],
  loading: false,
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_GANTT_CHART_REQUEST: {
      return {
        ...state,
        tasks: [],
        loading: true,
      };
    }
    case actions.GET_GANTT_CHART_SUCCESS: {
      return {
        ...state,
        tasks: action.tasks,
        loading: false,
      };
    }
    case actions.GET_GANTT_CHART_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    case actions.RESET_GANTT_CHART_STORE: {
      return initialState;
    }

    case actions.GET_ASSIGNEES_REQUEST:
      return {
        ...state,
        tasks: [],
        assignees: [],
        loading: true,
      };
    case actions.GET_ASSIGNEES_SUCCESS:
      return {
        ...state,
        assignees: action.assignees,
        loading: false,
      };
    default:
      return state;
  }
}
