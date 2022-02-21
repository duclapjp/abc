import BaseService from "./base.service";
import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";

export default class UploadService extends BaseService {
  manualFileUpload = (fileData) => {
    return this.axios.post(API_ENDPOINTS.HELP_MANUAL_UPLOAD, fileData);
  };
}
