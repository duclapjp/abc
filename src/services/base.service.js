import axiosInstance from "./axios.utils";

export default class BaseService {
  constructor(config) {
    this.axios = axiosInstance;
    this.config = config;
  }
}
