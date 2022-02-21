import actions from "@iso/redux/task/actions";
import { findIndex } from "lodash";

const initialState = {
  tasks: [],
  taskLogs: [],
  childTasks: [],
  directors: [],
  assignees: [],
  stores: [],
  registerPersons: [],
  tasklogTasks: [],
  total: 0,
  loading: true,
  error: null,
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
        total: action.total,
        loading: false,
      };
    case actions.GET_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.GET_TASKS_METADATA_REQUEST:
      return {
        ...state,
      };
    case actions.GET_TASKS_METADATA_SUCCESS:
      return {
        ...state,
        assignees: action.assignees,
        registerPersons: action.registerPersons,
        directors: action.directors,
        stores: action.stores,
      };
    case actions.GET_TASKS_METADATA_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.GET_TASK_LOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_TASK_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        taskLogs: action.taskLogs,
      };
    case actions.GET_TASK_LOG_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actions.GET_TASKLOG_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_TASKLOG_TASKS_SUCCESS:
      return {
        ...state,
        tasklogTasks: action.tasklogTasks,
        loading: false,
      };
    case actions.GET_TASKLOG_TASKS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actions.GET_CHILD_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_CHILD_TASKS_SUCCESS:
      const idx = findIndex(state.tasks, { taskId: action.taskId });
      if (idx >= 0) {
        state.tasks[idx].children = action.childTasks;
      }
      return {
        ...state,
        loading: false,
        tasks: state.tasks,
      };
    case actions.GET_CHILD_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.LOGOUT_RESET_LIST_TASK_SEARCH:
      return {
        ...state,
        tasks: [],
      };
    case actions.RESET_TASK_STORE:
      return initialState;
    default:
      return state;
  }
}
