import React, { memo, useCallback, useState } from "react";
import { Form, Input } from "formik-antd";
import { Col, Row, Button, Modal, Layout } from "antd";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import siteConfig from "@iso/config/site.config";
import authActions from "@iso/redux/auth/actions";
import ResetPasswordStyleWrapper from "./ResetPassword.styles";
import validationSchema from "./Validation.schema";
import { PUBLIC_ROUTE } from "./../../route.constants";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = { password: "", rePassword: "" };

  const onSubmit = useCallback(
    (data) => {
      const { password } = data;

      const params = new URLSearchParams(history.location.search);
      const token = params.get("token");

      setLoading(true);
      new Promise((resolve, reject) =>
        dispatch(authActions.resetPassword({ password, token, resolve, reject }))
      )
        .then(() => {
          Modal.success({
            title: messages["page.resetPass.modal.title"],
            content: messages["page.resetPass.modal.desc"],
            okText: messages["page.resetPass.modal.ok"],
            centered: true,
            onOk: () => history.push(PUBLIC_ROUTE.LANDING),
            onCancel: () => history.push(PUBLIC_ROUTE.LANDING),
          });
        })
        .catch((status) => {
          let titleErrorKey = "common.modalError.title.backendError";
          let contentErrorKey = "common.modalError.content.backendError";
          if (status === 400) {
            titleErrorKey = "page.resetPass.modalError.title";
            contentErrorKey = "page.resetPass.modalError.content";
          }
          Modal.error({
            title: messages[titleErrorKey],
            content: messages[contentErrorKey],
            centered: true,
            onOk: () => history.push(PUBLIC_ROUTE.LANDING),
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch, history, messages]
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["page.resetPassTitle"]} | HLS</title>
      </Helmet>
      <ResetPasswordStyleWrapper className="isoResetPassPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">{messages["page.resetPassTitle"]}</div>
            <div className="isoFormHeadText">
              {messages["page.resetPassSubTitle"]}
            </div>
            <div className="isoResetPassForm">
              <Formik
                onSubmit={onSubmit}
                validationSchema={validationSchema(messages)}
                initialValues={initialValues}
                render={() => (
                  <Form
                    name="basic"
                    colon={false}
                    wrapperCol={{ lg: { span: 20, offset: 2 }, sx: { span: 24 } }}
                  >
                    <Form.Item name="password">
                      <Input.Password
                        name="password"
                        autoComplete={"new-password"}
                        placeholder={messages["page.resetPass.password"]}
                      />
                    </Form.Item>
                    <Form.Item name="rePassword">
                      <Input.Password
                        name="rePassword"
                        autoComplete={"new-password"}
                        placeholder={messages["page.resetPass.rePassword"]}
                      />
                    </Form.Item>
                    <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 14, offset: 5 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          loading={loading}
                          className="btnSubmitReset"
                        >
                          {messages["page.resetPassBtn"]}
                        </Button>
                      </Col>
                    </Row>
                    <Row justify={"center"}>
                      <Link to={PUBLIC_ROUTE.LANDING} className="toSignin">
                        {messages["page.resetPass.goToSignin"]}
                      </Link>
                    </Row>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </ResetPasswordStyleWrapper>
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

export default memo(ResetPassword);
