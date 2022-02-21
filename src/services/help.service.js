import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import BaseService from "./base.service";

export default class HelpService extends BaseService {
  getDataChainHelp = ({ ...data }) => {
    return this.axios.get(API_ENDPOINTS.HELP_HELP_CHAIN_INFO, {
      params: { ...data },
    });
  };

  getDataStoresHelp = ({ ...data }) => {
    return this.axios.get(API_ENDPOINTS.GET_HELP_STORE_INFO, {
      params: { ...data },
    });
  };

  getManualFileDetail = () => {
    return this.axios.get(API_ENDPOINTS.HELP_MANUAL_FILE_DETAIL);
  };
}
