import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import BaseService from "./base.service";

export default class DashboardService extends BaseService {
  fetchStopWatches = ({ ...data }) => {
    return this.axios.get(API_ENDPOINTS.DASHBOARD_STOPWATCHS, {
      params: {
        ...data,
        sortBy: "due_date",
        sortByType: 1,
      },
    });
  };
  fetchUncompletedTasks = ({ ...data }) => {
    return this.axios.get(API_ENDPOINTS.DASHBOARD_PENDING_TASKS, {
      params: {
        ...data,
        sortBy: "due_date",
        sortByType: 1,
      },
    });
  };
  fetchChildrenTask = ({ taskId }) => {
    return this.axios.get(
      API_ENDPOINTS.DASHBOARD_CHILDREN_TASK.replace("{taskId}", taskId),
      {
        params: {
          sortBy: "due_date",
          sortByType: 1,
        },
      }
    );
  };
}
