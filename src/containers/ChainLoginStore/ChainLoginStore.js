import React, { useEffect, memo } from "react";
import { Row, Modal } from "antd";
import Loader from "@iso/components/utility/loader";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "@iso/redux/auth/actions";
import { X_REQUESTED_STOREID } from "@iso/constants/common.constant";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";

const ChainLoginStore = () => {
  const { messages } = useIntl();
  const { storeId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { chainLoginStoreChecking } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (storeId) {
      sessionStorage.setItem(X_REQUESTED_STOREID, +storeId);
      new Promise((resolve, reject) => {
        dispatch(authActions.chainLoginStore({ resolve, reject }));
      })
        .then(() => {
          history.push("/store/dashboard");
        })
        .catch(() => {
          sessionStorage.removeItem(X_REQUESTED_STOREID);
          Modal.error({
            title: messages["chainLoginStore.failed"],
            content: messages["chainLoginStore.content"],
            onOk: () => history.push("/chain/dashboard"),
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (chainLoginStoreChecking) {
    return <Loader />;
  }

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Store | HLS</title>
      </Helmet>
      <PageHeader>Login Store</PageHeader>
      <LayoutContent>
        <Row>
          <h1>Please wait to Login Store</h1>
        </Row>
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default memo(ChainLoginStore);
