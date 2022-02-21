import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import BaseService from "./base.service";

export default class AccountService extends BaseService {
  fetchUser = () => {
    return this.axios.get(API_ENDPOINTS.ACCOUNT_SETTING);
  };

  updateUser = (user) => {
    return this.axios.post(API_ENDPOINTS.ACCOUNT_SETTING, { ...user });
  };

  fetchAccounts = ({ role, mail, searchKeyword, page, size }) => {
    const data = {
      role,
      mail,
      searchKeyword,
      page,
      size,
    };
    return this.axios.post(API_ENDPOINTS.ACCOUNTS, data);
  };

  getAccount = ({ id }) => {
    return this.axios.get(`${API_ENDPOINTS.ACCOUNT}/${id}`);
  };

  loadChainData = () => {
    return this.axios.post(API_ENDPOINTS.CHAINS);
  };

  loadStoreData = ({ chainId }) => {
    return this.axios.post(API_ENDPOINTS.STORES, { chainId });
  };

  createAccount = ({ ...data }) => {
    return this.axios.post(API_ENDPOINTS.ACCOUNT, {
      ...data,
    });
  };

  editAccount = ({ accountId, ...data }) => {
    return this.axios.post(API_ENDPOINTS.ACCOUNT, {
      accountId,
      ...data,
    });
  };
}
