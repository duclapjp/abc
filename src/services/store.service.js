import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";

import BaseService from "./base.service";

export default class StoreService extends BaseService {
  getStores = ({ data }) => {
    return this.axios.post(API_ENDPOINTS.STORE_SEARCH, data);
  };

  getSelectStores = () => {
    return this.axios.post(API_ENDPOINTS.STORE_SEARCH, {});
  };

  getDirectors = () => {
    return this.axios.post(API_ENDPOINTS.DIRECTORS);
  };

  getDirectorsAddEdit = () => {
    return this.axios.get(API_ENDPOINTS.LIST_DIRECTORS);
  };

  getOtaList = () => {
    return this.axios.post(API_ENDPOINTS.LIST_OTA);
  };

  getStoreDetail = ({ id }) => {
    return this.axios.get(`${API_ENDPOINTS.STORES}/${id}`);
  };

  loadChainData = () => {
    return this.axios.post(API_ENDPOINTS.CHAINS);
  };

  createStore = (data) => {
    return this.axios.post(API_ENDPOINTS.STORE, data);
  };

  editStore = ({ storeId, data }) => {
    return this.axios.put(`${API_ENDPOINTS.STORES}/${storeId}`, data);
  };

  getStoreOptions = ({ filter, chainId }) => {
    filter = chainId ? `${filter},chain_id:${chainId}` : filter;
    return this.axios.post(API_ENDPOINTS.STORES, { filter });
  };

  updateExpiredDate = ({ storeId, otaId, ...data }) => {
    return this.axios.put(
      API_ENDPOINTS.UPDATE_STORE_OTA_EXPIRED_DATE.replace(
        "{storeId}",
        storeId
      ).replace("{otaId}", otaId),
      {
        ...data,
      }
    );
  };

  getStoreOTAs = ({ storeId }) => {
    return this.axios.get(API_ENDPOINTS.STORE_OTAS.replace("{storeId}", storeId));
  };
}
