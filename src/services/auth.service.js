import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import BaseService from "./base.service";

export default class AuthService extends BaseService {
  signIn = ({ email, password }) => {
    return this.axios.post(API_ENDPOINTS.LOGIN, {
      mail: email,
      password,
    });
  };

  getCurrentUser = () => {
    return this.axios.get(API_ENDPOINTS.CURRENT_USER);
  };

  forgetPassword = ({ email }) => {
    return this.axios.post(API_ENDPOINTS.RESET_PASS, { resetmail: email });
  };

  resetPassword = ({ password, token }) => {
    const url = `${API_ENDPOINTS.ACCOUNT_PASSWORD}?token=${token}`;
    return this.axios.put(url, { newPassword: password });
  };

  confirmEmail = ({ token }) => {
    const url = `${API_ENDPOINTS.CONFIRM_EMAIL}?token=${token}`;
    return this.axios.get(url);
  };
}
