import actions from "./actions";

const initialState = {
  task: {},
  loading: false,
  loadingMetaData: false,
  loadingUserNotifyList: false,
  loadingTaskLog: false,
  loadingSummaries: false,
  loadingTaskChildren: false,
  amountGroupSelectModal: false,
  amountGroupPreviewModal: false,
  previewItem: {},
  taskLogs: [],
  summaries: [],
  userNotifyList: [],
  categoryList: [],
  userAssigneeList: [],
  taskChildren: [],
  taskLogsTotal: 0,
  summariesTotal: 0,
  taskChildrenTotal: 0,
  comments: [],
  totalComment: 0,
  sumConfirmTime: 0,
  sumExecuteTime: 0,
  planDefaultList: [],
  taskMode: false,
};

export default function storeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_TASK_MODE: {
      return {
        ...state,
        taskMode: !state.taskMode,
      };
    }
    case actions.GET_TASK_DETAIL_REQUEST: {
      return {
        ...state,
        task: {},
        loading: true,
      };
    }
    case actions.GET_TASK_DETAIL_SUCCESS: {
      return {
        ...state,
        task: action.task,
        loading: false,
      };
    }
    case actions.GET_TASK_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case actions.GET_TASK_METADATA_REQUEST: {
      return {
        ...state,
        loadingMetaData: true,
        categoryList: [],
        planDefaultList: [],
        userAssigneeList: [],
        sumConfirmTime: 0,
        sumExecuteTime: 0,
      };
    }
    case actions.GET_TASK_METADATA_SUCCESS: {
      return {
        ...state,
        categoryList: action.categoryList,
        planDefaultList: action.planDefaultList,
        userAssigneeList: action.userAssigneeList,
        loadingMetaData: false,
      };
    }
    case actions.GET_TASK_METADATA_ERROR: {
      return {
        ...state,
        loadingMetaData: false,
      };
    }
    case actions.GET_COMMENT_USER_NOTIFY_REQUEST: {
      return {
        ...state,
        loadingUserNotifyList: true,
        userNotifyList: [],
      };
    }
    case actions.GET_COMMENT_USER_NOTIFY_SUCCESS: {
      return {
        ...state,
        loadingUserNotifyList: false,
        userNotifyList: action.userNotifyList,
      };
    }
    case actions.GET_COMMENT_USER_NOTIFY_ERROR: {
      return {
        ...state,
        loadingUserNotifyList: false,
      };
    }
    case actions.ADD_TASK_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }
    case actions.ADD_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        // task: action.task,
      };
    }
    case actions.ADD_TASK_ERROR: {
      return {
        loading: false,
        ...state,
      };
    }
    case actions.EDIT_TASK_SUCCESS: {
      return {
        ...state,
        task: action.task,
      };
    }
    case actions.GET_TASK_TASKLOG_REQUEST: {
      return {
        ...state,
        loadingTaskLog: true,
        taskLogs: [],
        taskLogsTotal: 0,
      };
    }
    case actions.GET_TASK_TASKLOG_SUCCESS: {
      return {
        ...state,
        loadingTaskLog: false,
        taskLogs: action.taskLogs,
        taskLogsTotal: action.taskLogsTotal,
      };
    }
    case actions.GET_TASK_TASKLOG_ERROR: {
      return {
        ...state,
        loadingTaskLog: false,
        taskLogs: [],
        taskLogsTotal: 0,
      };
    }
    case actions.GET_SUMMARIES_REQUEST: {
      return {
        ...state,
        loadingSummaries: true,
        summaries: [],
        summariesTotal: 0,
      };
    }
    case actions.GET_SUMMARIES_SUCCESS: {
      return {
        ...state,
        loadingSummaries: false,
        summaries: action.summaries,
        summariesTotal: action.summariesTotal,
      };
    }
    case actions.GET_SUMMARIES_ERROR: {
      return {
        ...state,
        loadingSummaries: false,
        summaries: [],
        summariesTotal: 0,
      };
    }
    case actions.GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        comments: action.comments,
        totalComment: action.totalComment,
      };
    }
    case actions.CREATE_COMMENT_SUCCESS: {
      return {
        ...state,
        comments: [...state.comments, action.comment],
        totalComment: state.totalComment + 1,
        task: {
          ...state.task,
          ...action.task,
        },
      };
    }
    case actions.GET_TASKS_CHILDREN_REQUEST: {
      return {
        ...state,
        loadingTaskChildren: true,
        taskChildren: [],
        taskChildrenTotal: 0,
      };
    }
    case actions.GET_TASKS_CHILDREN_SUCCESS: {
      return {
        ...state,
        loadingTaskChildren: false,
        taskChildren: action.tasks,
        taskChildrenTotal: action.total,
      };
    }
    // case actions.GET_TASK_TOTAL_TIMES_REQUEST: {
    //   return {
    //     ...state,
    //     sumConfirmTime: 0,
    //     sumExecuteTime: 0,
    //   };
    // }
    case actions.GET_TASK_TOTAL_TIMES_SUCCESS: {
      return {
        ...state,
        sumConfirmTime: action.sumConfirmTime,
        sumExecuteTime: action.sumExecuteTime,
      };
    }
    case actions.EDIT_TASKLOG_REQUEST: {
      return {
        ...state,
      };
    }
    case actions.EDIT_TASKLOG_SUCCESS: {
      return {
        ...state,
      };
    }
    case actions.EDIT_TASKLOG_ERROR: {
      return {
        ...state,
      };
    }
    case actions.RESET_TASK_ADD_EDIT_STORE: {
      return initialState;
    }
    case actions.TOGGLE_AMOUNT_GROUP_SELECT: {
      return {
        ...state,
        amountGroupSelectModal: !state.amountGroupSelectModal,
      };
    }
    case actions.TOGGLE_AMOUNT_GROUP_PREVIEW: {
      return {
        ...state,
        amountGroupPreviewModal: !state.amountGroupPreviewModal,
      };
    }
    case actions.SET_ITEM_PREVIEW: {
      return {
        ...state,
        previewItem: action.payload,
      };
    }
    default:
      return state;
  }
}
