import React, { memo, useState, useEffect } from "react";
import { Button, Layout, Result } from "antd";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Loader from "@iso/components/utility/loader";
import siteConfig from "@iso/config/site.config";
import confirmEmailActions from "@iso/redux/confirmEmail/actions";
import ConfirmEmailStyleWrapper from "./ConfirmEmail.styles";
import { PUBLIC_ROUTE } from "../../route.constants";
import { Helmet } from "react-helmet";

export const STATUS_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
};

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(STATUS_TYPES.SUCCESS);
  const [error, setError] = useState(null);
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    const token = params.get("token");

    setLoading(true);
    new Promise((resolve, reject) =>
      dispatch(confirmEmailActions.confirmEmail({ token, resolve, reject }))
    )
      .then(() => {
        setStatus(STATUS_TYPES.SUCCESS);
      })
      .catch((error) => {
        setStatus(STATUS_TYPES.ERROR);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, history]);

  const titleKey = `page.confirmEmail.${status}.title`;
  let contentKey = `page.confirmEmail.${status}.content`;
  if (error && error.status !== 400) {
    contentKey = "common.modalError.content.backendError";
  }

  return (
    <>
      <ConfirmEmailStyleWrapper className="isoResetPassPage">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Eメール確認 | HLS</title>
        </Helmet>
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            {loading && <Loader />}
            {!loading && (
              <Result
                status={status}
                title={messages[titleKey]}
                subTitle={messages[contentKey]}
                extra={[
                  <Link to={PUBLIC_ROUTE.LANDING} key="console">
                    <Button type="primary">
                      {messages["page.confirmEmail.button"]}
                    </Button>
                  </Link>,
                ]}
              />
            )}
          </div>
        </div>
      </ConfirmEmailStyleWrapper>
      <Layout.Footer style={styles.footer}>{siteConfig.footerText}</Layout.Footer>
    </>
  );
};

const styles = {
  layout: { flexDirection: "row", overflowX: "hidden" },
  footer: {
    background: "#ffffff",
    textAlign: "center",
    borderTop: "1px solid #ededed",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
};

export default memo(ConfirmEmail);
