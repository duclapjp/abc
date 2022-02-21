import React, { memo, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Col, Layout, Modal, Row } from "antd";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import SignInStyleWrapper from "./SignIn.styles";
import validationSchema from "./Validation.schema";
import authActions from "@iso/redux/auth/actions";
import siteConfig from "@iso/config/site.config";
import { PUBLIC_ROUTE } from "./../../route.constants";
import { ERROR_MESSAGES, ERROR_STATUS } from "@iso/constants/common.constant";
import { Helmet } from "react-helmet";

const SignIn = () => {
  const history = useHistory();
  const { messages } = useIntl();
  const { idToken, loginChecking, error, dashboardRoute } = useSelector(
    (state) => state.Auth
  );
  const dispatch = useDispatch();
  const initialValues = { email: "", password: "" };

  useEffect(() => {
    if (idToken) {
      history.push(dashboardRoute);
    }
  }, [idToken, history, dashboardRoute]);

  useEffect(() => {
    if (error) {
      const { status, message } = error.response || {};
      let contentKey = "common.modalError.content.backendError";

      if (status === ERROR_STATUS.NOT_AUTHENTICATION) {
        contentKey =
          message === ERROR_MESSAGES.ERROR_LOGIN_POST_USERINACTIVE
            ? "page.signIn.error.accountInactive"
            : "page.signIn.errorContent";
      }

      Modal.error({
        title: messages["page.signIn.errorTitle"],
        content: messages[contentKey],
        onOk: () => {
          dispatch(authActions.clearErrors());
        },
      });
    }
  }, [error, messages, dispatch]);

  const onSubmit = useCallback(
    (data) => {
      const { email, password } = data;
      dispatch(authActions.login({ email, password }));
    },
    [dispatch]
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["page.signInTitle"]} | HLS</title>
      </Helmet>
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">{messages["page.signInTitle"]}</div>
            <div className="isoSignInForm">
              <Formik
                onSubmit={onSubmit}
                validationSchema={validationSchema(messages)}
                initialValues={initialValues}
                render={() => (
                  <Form {...layout} name="basic" colon={false} labelAlign="left">
                    <Form.Item label={messages["page.mailAddress"]} name="email">
                      <Input name="email" autoComplete={"new-password"} />
                    </Form.Item>

                    <Form.Item label={messages["page.password"]} name="password">
                      <Input.Password
                        name="password"
                        autoComplete={"new-password"}
                      />
                    </Form.Item>
                    <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 6, offset: 9 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btnSubmitSignin"
                          block
                          loading={loginChecking}
                        >
                          {messages["page.signInBtn"]}
                        </Button>
                      </Col>
                    </Row>
                    <Row justify={"center"}>
                      <Link
                        to={PUBLIC_ROUTE.FORGET_PASSWORD}
                        className="isoForgotPass"
                      >
                        {messages["page.signInForgotPass"]}
                      </Link>
                    </Row>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
      <Layout.Footer style={styles.footer}>{siteConfig.footerText}</Layout.Footer>
    </>
  );
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
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

export default memo(SignIn);
