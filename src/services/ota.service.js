import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import BaseService from "./base.service";

export default class OTAService extends BaseService {
  fetchOTAs = ({ ...data }) => {
    return this.axios.get(API_ENDPOINTS.LIST_OTA, {
      params: {
        sortBy: "ota_id",
        sortByType: "-1",
        ...data,
      },
    });
  };

  toggleOTAStatus = ({ otaId, status }) => {
    return this.axios.put(
      API_ENDPOINTS.OTA_UPDATE_STATUS.replace("{otaId}", otaId),
      {
        status,
      }
    );
  };

  fetchOTATypes = () => {
    return this.axios.get(API_ENDPOINTS.OTA_TYPES, {
      params: {
        sortBy: "ota_type_id",
        sortByType: -1,
      },
    });
  };

  fetchOta = ({ otaId }) => {
    return this.axios.get(API_ENDPOINTS.OTA_DETAIL_UPDATE.replace("{otaId}", otaId));
  };

  updateOTA = ({ data }) => {
    const { otaId } = data;
    return this.axios.put(
      API_ENDPOINTS.OTA_DETAIL_UPDATE.replace("{otaId}", otaId),
      {
        ...data,
      }
    );
  };

  createOTA = ({ data }) => {
    return this.axios.post(API_ENDPOINTS.CREATE_OTA, data);
  };
}
