import axios from "axios";
import {
  ACCESS_TOKEN_KEY,
  X_REQUESTED_STOREID,
} from "@iso/constants/common.constant";
import { clearToken } from "@iso/lib/helpers/utility";
import { ENDPOINTS_WITHOUT_AUTHEN } from "@iso/constants/apiEndpoints.constant";

export const baseURL = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_API_PRE_ENDPOINT}`;

const axiosInstance = axios.create({
  baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config = {}) => {
    const { url, headers = {} } = config;
    const path = url.substring(0, url.indexOf("?"));
    if (!ENDPOINTS_WITHOUT_AUTHEN.includes(path)) {
      headers.Authorization = "Bearer " + localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    const storeIdInSession = sessionStorage.getItem(X_REQUESTED_STOREID);
    if (!ENDPOINTS_WITHOUT_AUTHEN.includes(path)) {
      headers.Authorization = "Bearer " + localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    if (storeIdInSession) {
      headers[X_REQUESTED_STOREID] = storeIdInSession;
    }
    return {
      ...config,
      baseURL: `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_API_PRE_ENDPOINT}`,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const responseData = response.data;
    const { status, message, data } = responseData;
    if (status === 200) {
      return data;
    } else if (status === 401) {
      clearToken();
    }
    return Promise.reject({
      response: {
        status,
        message,
      },
    });
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
