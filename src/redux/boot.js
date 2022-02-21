import { store } from "./store";
import authActions from "@iso/redux/auth/actions";
import { getAccessToken } from "@iso/lib/helpers/utility";

export default () =>
  new Promise((resolve, reject) => {
    if (getAccessToken()) {
      return store.dispatch(authActions.checkAuthorization({ resolve, reject }));
    }
    return resolve();
  });
