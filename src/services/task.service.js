import BaseService from "./base.service";
import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";

export default class TaskService extends BaseService {
  getTasks = ({ ...data }) => {
    return this.axios.post(API_ENDPOINTS.TASKS_SEARCH, {
      ...data,
    });
  };

  getTaskLog = ({ params }) => {
    return this.axios.get(`${API_ENDPOINTS.ADMIN_TASKLOGS}${params}`);
  };

  getTaskLogTasks = ({ params }) => {
    return this.axios.get(`${API_ENDPOINTS.TASKLOGS_TASKS}${params}`);
  };

  getAssignees = () => {
    return this.axios.get(API_ENDPOINTS.LIST_USERS);
  };

  getRegisterPersons = () => {
    return this.axios.get(API_ENDPOINTS.LIST_REGISTERS);
  };

  getDirectors = () => {
    return this.axios.post(API_ENDPOINTS.DIRECTORS);
  };

  getStores = ({ chainId }) => {
    return this.axios.post(API_ENDPOINTS.STORES, { chainId });
  };

  getCategoryList = () => {
    return this.axios.get(API_ENDPOINTS.CATEGORIES);
  };

  getPlanDefaultList = () => {
    return this.axios.get(API_ENDPOINTS.PLANS);
  };

  getUserAssigneeList = (values) => {
    const { list_role, sort_by } = values;
    return this.axios.get(`${API_ENDPOINTS.USERS}`, {
      params: {
        roles: list_role,
        sortBy: sort_by,
      },
    });
  };

  getCommentUserNotifyRequest = ({ id, type }) => {
    return this.axios.get(API_ENDPOINTS.USERS_MENTION_TASK.replace("{taskId}", id), {
      params: {
        type,
      },
    });
  };

  getTaskDetail = ({ taskId }) => {
    return this.axios.get(`${API_ENDPOINTS.TASKS}/${taskId}`);
  };

  createTask = (data) => {
    return this.axios.post(API_ENDPOINTS.TASK, data);
  };

  editTask = ({ taskId, data }) => {
    return this.axios.put(`${API_ENDPOINTS.TASKS}/${taskId}`, data);
  };

  fetchTaskLogs = ({ taskId, ...data }) => {
    return this.axios.post(API_ENDPOINTS.TASK_TASKLOGS.replace("{taskId}", taskId), {
      ...data,
      sortBy: "task_log_date",
      sortByType: "-1",
    });
  };

  fetchSummaries = ({ taskId, ...data }) => {
    return this.axios.post(
      API_ENDPOINTS.TASK_TASKLOG_SUMMARIES.replace("{taskId}", taskId),
      {
        ...data,
      }
    );
  };

  getComments = ({ taskId, data }) => {
    return this.axios.post(
      API_ENDPOINTS.TASK_COMMENTS.replace("{taskId}", taskId),
      data
    );
  };

  createComment = (data) => {
    return this.axios.post(API_ENDPOINTS.ADD_COMMENTS, data);
  };

  getTaskChildren = ({ taskId, ...data }) => {
    return this.axios.get(API_ENDPOINTS.TASK_CHILDREN.replace("{taskId}", taskId), {
      data,
    });
  };

  fetchTaskLogsLatest = ({ taskId }) => {
    return this.axios.get(
      API_ENDPOINTS.TASK_TASKLOGS_LATEST.replace("{taskId}", taskId)
    );
  };

  executeStopWatch = ({ taskId, action, type }) => {
    return this.axios.post(
      API_ENDPOINTS.TASK_STOPWATCH.replace("{taskId}", taskId),
      {
        action,
        type,
      }
    );
  };

  getTaskTotalTimes = ({ taskId }) => {
    return this.axios.get(
      API_ENDPOINTS.TASK_TOTAL_TIMES.replace("{taskId}", taskId)
    );
  };

  editTaskLog = ({ taskId, taskLogId, datetime }) => {
    return this.axios.put(
      API_ENDPOINTS.TASK_EDIT_TASKLOG.replace("{taskId}", taskId).replace(
        "{taskLogId}",
        taskLogId
      ),
      {
        datetime,
      }
    );
  };
}
