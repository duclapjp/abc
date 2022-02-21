import BaseService from "./base.service";
import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";

export default class GanttChartService extends BaseService {
  getTasksForGanttChart = (data) => {
    return this.axios.post(API_ENDPOINTS.GANTT_CHART, data);
  };
  getAssignees = () => {
    return this.axios.get(API_ENDPOINTS.LIST_USERS);
  };
}
