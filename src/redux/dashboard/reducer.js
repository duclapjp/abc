import actions from "./actions";
import { findIndex } from "lodash";

const initState = {
  loadingStopWatches: true,
  loadingUncompletedTasks: true,
  loadingCategories: true,
  stopWatches: [],
  uncompletedTasks: [],
  stopWatchesTotal: 0,
  uncompletedTasksTotal: 0,
  categories: [],
};

export default function dashboardReducer(state = initState, action) {
  const {
    stopWatches,
    stopWatchesTotal,
    uncompletedTasks,
    uncompletedTasksTotal,
  } = action;
  switch (action.type) {
    case actions.GET_STOP_WATCHES_REQUEST:
      return {
        ...state,
        loadingStopWatches: true,
        stopWatches: [],
      };
    case actions.GET_STOP_WATCHES_SUCCESS:
      return {
        ...state,
        loadingStopWatches: false,
        stopWatches,
        stopWatchesTotal,
      };
    case actions.GET_UNCOMPLETED_TASK_REQUEST:
      return {
        ...state,
        loadingUncompletedTasks: true,
        uncompletedTasks: [],
      };
    case actions.GET_UNCOMPLETED_TASK_SUCCESS:
      return {
        ...state,
        loadingUncompletedTasks: false,
        uncompletedTasks,
        uncompletedTasksTotal,
      };
    case actions.GET_CHILDREN_TASK_REQUEST:
      return {
        ...state,
        loadingUncompletedTasks: true,
      };
    case actions.GET_CHILDREN_TASK_SUCCESS:
      const idx = findIndex(state.uncompletedTasks, { taskId: action.taskId });
      if (idx >= 0) {
        state.uncompletedTasks[idx].children = action.childTasks;
      }
      return {
        ...state,
        loadingUncompletedTasks: false,
        uncompletedTasks: state.uncompletedTasks,
      };
    case actions.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: [],
        loadingCategories: true,
      };
    case actions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        loadingCategories: false,
      };
    case actions.GET_CATEGORIES_ERROR:
      return {
        ...state,
        categories: [],
        loadingCategories: false,
      };
    default:
      return state;
  }
}
