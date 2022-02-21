import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import paginationConfig from "@iso/config/pagination.config";

import BaseService from "./base.service";

export default class NotifyService extends BaseService {
  getNotify = ({ ...params }) => {
    return this.axios.get(API_ENDPOINTS.NOTIFICATION, {
      params: {
        ...params,
        size: paginationConfig.pageSize,
        sortBy: "created_date",
        sortByType: 1,
      },
    });
  };

  updateStatus = ({ taskId, status }) => {
    return this.axios.post(
      API_ENDPOINTS.TASK_EDIT_STATUS.replace("{task_id}", taskId),
      {
        status,
      }
    );
  };
}
