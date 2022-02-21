import BaseService from "./base.service";
import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";

export default class PasswordHistoryService extends BaseService {
  fetchPasswordHistories = ({ storeId, otaId, accountId, page, size }) =>
    this.axios.post(API_ENDPOINTS.PASSWORD_HISTORIES, {
      storeId,
      otaId,
      accountId,
      page,
      size,
    });
  fetchOTAs = ({ storeId }) => this.axios.post(API_ENDPOINTS.LIST_OTA, { storeId });
  fetchOtaAccounts = ({ storeId }) =>
    this.axios.post(API_ENDPOINTS.OTA_ACCOUNTS, { storeId });
  fetchDirectors = () => this.axios.post(API_ENDPOINTS.DIRECTORS, {});
}
