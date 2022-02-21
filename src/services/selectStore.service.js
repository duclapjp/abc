import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import BaseService from "./base.service";

export default class SelectStoreService extends BaseService {
  fetchStores = () => this.axios.get(API_ENDPOINTS.SELECT_STORES);
  fetchDirectors = () => this.axios.post(API_ENDPOINTS.DIRECTORS);
  fetchChains = () => this.axios.post(API_ENDPOINTS.CHAINS);
}
