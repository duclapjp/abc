import BaseService from "./base.service";
import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import { ACCESS_TOKEN_KEY } from "@iso/constants/common.constant";
import { baseURL } from "./axios.utils";

export default class DownloadService extends BaseService {
  buildUrlDownload = ({ taskId, taskAttachId }) => {
    const url = [
      API_ENDPOINTS.TASK_ATTACH_DOWNLOAD.replace("{taskId}", taskId),
      taskAttachId,
      "&jwt=",
      localStorage.getItem(ACCESS_TOKEN_KEY),
    ].join("");

    return `${baseURL}${url}`;
  };

  deleteAttach = ({ taskId, taskAttachId }) => {
    return this.axios.delete(
      API_ENDPOINTS.TASK_ATTACH_DELETE.replace("{taskId}", taskId).replace(
        "{taskAttachId}",
        taskAttachId
      )
    );
  };
}
