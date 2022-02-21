import BaseService from "@iso/services/base.service";
import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";

export default class ChainService extends BaseService {
  getChainOptions = () => {
    return this.axios.post(API_ENDPOINTS.CHAINS);
  };

  searchChains = ({ ...data }) => {
    return this.axios.post(API_ENDPOINTS.CHAIN_SEARCH, data);
  };

  getChain = ({ id }) => {
    return this.axios.get(`${API_ENDPOINTS.CHAINS}/${id}`);
  };

  createChain = ({ ...data }) => {
    return this.axios.post(API_ENDPOINTS.CHAIN, data);
  };

  updateChain = ({ id, ...data }) => {
    return this.axios.put(`${API_ENDPOINTS.CHAINS}/${id}`, data);
  };

  getDirectionOptions = () => {
    return this.axios.get(API_ENDPOINTS.LIST_DIRECTORS);
  };

  fetChainById = (id) => {
    return this.axios.get(`${API_ENDPOINTS.CHAINS}/${id}`);
  };
  updateChainSetting = (id, data) => {
    return this.axios.put(`${API_ENDPOINTS.CHAINS}/${id}`, data);
  };
}
