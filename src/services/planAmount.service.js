import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";

import BaseService from "./base.service";

export default class PlanAmountService extends BaseService {
  /** AMOUNT_RANK */
  getAmountRank = () => {
    return this.axios.get(API_ENDPOINTS.AMOUNT_RANKS);
  };

  updateAmountRank = ({ data }) => {
    return this.axios.post(API_ENDPOINTS.AMOUNT_RANKS, { amountRanks: data });
  };

  /** TASK_TEMPLATE */
  fetchTaskTemplates = () => {
    return this.axios.get(API_ENDPOINTS.TASK_TEMPLATES, {
      params: {
        size: 0,
      },
    });
  };

  /** DEFAULT_PLAN */
  fetchDefaultPlans = () => {
    return this.axios.get(API_ENDPOINTS.PLANS, {
      params: {
        size: 0,
      },
    });
  };

  fetchDefaultPlan = ({ planId, ...data }) => {
    return this.axios.get(API_ENDPOINTS.PLAN.replace("{planId}", planId), {
      params: {
        ...data,
      },
    });
  };

  createDefaultPlan = ({ name, status, items }) => {
    return this.axios.post(API_ENDPOINTS.ADD_PLAN, { name, status, items });
  };

  updateDefaultPlan = ({ planId, name, status, items }) => {
    return this.axios.put(API_ENDPOINTS.PLAN.replace("{planId}", planId), {
      name,
      status,
      items,
    });
  };

  reOrderPlan = ({ plans }) => {
    return this.axios.post(API_ENDPOINTS.PLAN_REORDER, {
      plans,
    });
  };

  getAmountGroups = () => {
    return this.axios.get(API_ENDPOINTS.AMOUNT_GROUPS);
  };

  updateAmountGroups = ({ data }) => {
    return this.axios.post(`${API_ENDPOINTS.AMOUNT_GROUPS}`, data);
  };

  getAmountItemEdit = ({ id }) => {
    return this.axios.get(API_ENDPOINTS.AMOUNT_GROUP.replace("{amountId}", id));
  };

  addEditAmountGroup = ({ data }) => {
    return this.axios.post(API_ENDPOINTS.ADD_AMOUNT_GROUP, data);
  };
}
