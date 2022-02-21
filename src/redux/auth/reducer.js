import actions from "./actions";
import { getAccessToken } from "@iso/lib/helpers/utility";
import { PRIVATE_ROUTE } from "../../route.constants";
import { ROLES_MAPPING_ROUTER, ROLES } from "../../constants/common.constant";

const initState = {
  idToken: getAccessToken(),
  user: null,
  loginChecking: false,
  chainLoginStoreChecking: false,
  chainLoginStoreError: null,
  error: null,
  errorCheckAuthen: null,
  checkAuth: false,
  dashboardRoute: "/",
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.CHECK_AUTHORIZATION:
      return {
        ...state,
        user: null,
        errorCheckAuthen: null,
        checkAuth: true,
        dashboardRoute: "/",
      };
    case actions.CHECK_AUTHORIZATION_ERROR:
      return {
        ...state,
        errorCheckAuthen: action.error,
      };
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        loginChecking: true,
        dashboardRoute: "/",
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        loginChecking: false,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        errorCheckAuthen: null,
        user: action.profile,
        idToken: action.token,
        loginChecking: false,
        checkAuth: false,
        dashboardRoute: PRIVATE_ROUTE.DASHBOARD.replace(
          ":role",
          ROLES_MAPPING_ROUTER[action.profile?.role]
        ),
      };
    case actions.CHAIN_LOGIN_STORE_REQUEST:
      return {
        ...state,
        chainLoginStoreError: null,
        chainLoginStoreChecking: true,
      };
    case actions.CHAIN_LOGIN_STORE_SUCCESS:
      return {
        ...state,
        chainLoginStoreChecking: false,
        dashboardRoute: PRIVATE_ROUTE.DASHBOARD.replace(
          ":role",
          ROLES_MAPPING_ROUTER[ROLES.STORE]
        ),
        user: {
          ...state.profile,
          role: ROLES.STORE,
        },
      };
    case actions.CHAIN_LOGIN_STORE_ERROR:
      return {
        ...state,
        chainLoginStoreChecking: false,
        chainLoginStoreError: action.error,
      };
    case actions.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case actions.LOGOUT:
      return {
        ...initState,
        idToken: "",
      };
    case actions.UPDATE_USER_LOGIN:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    default:
      return state;
  }
}
