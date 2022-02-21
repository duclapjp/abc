import React, { memo, useCallback, useState } from "react";
import { Form, Input } from "formik-antd";
import { Col, Row, Button, Layout, Modal } from "antd";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { Link, useHistory } from "react-router-dom";

import siteConfig from "@iso/config/site.config";
import authActions from "@iso/redux/auth/actions";
import ForgotPasswordStyleWrapper from "./ForgotPassword.styles";
import validationSchema from "./Validation.schema";
import { PUBLIC_ROUTE } from "./../../route.constants";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = { email: "" };
  const { messages, formatMessage } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = useCallback(
    (data) => {
      const { email } = data;
      setLoading(true);
      new Promise((resolve, reject) =>
        dispatch(authActions.forgotPassword({ email, resolve, reject }))
      )
        .then((resetmail) => {
          Modal.success({
            title: messages["page.forgetPass.modal.title"],
            content: formatMessage(
              { id: "page.forgetPass.modal.desc" },
              { email: hiddenEmail(resetmail) }
            ),
            okText: messages["page.forgetPass.modal.ok"],
            centered: true,
            onOk: () => history.push(PUBLIC_ROUTE.LANDING),
            onCancel: () => history.push(PUBLIC_ROUTE.LANDING),
          });
        })
        .catch((status) => {
          let titleErrorKey = "page.forgetPass.modalError.title";
          let contentErrorKey;
          if (status === 503) {
            contentErrorKey = "page.forgetPass.modalError.content.mailNotExist";
          } else if (status === 400) {
            contentErrorKey = "page.forgetPass.modalError.content.mailInvalid";
          } else {
            titleErrorKey = "common.modalError.title.backendError";
            contentErrorKey = "common.modalError.content.backendError";
          }
          Modal.error({
            title: messages[titleErrorKey],
            content: messages[contentErrorKey],
            centered: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch, formatMessage, messages, history]
  );

  return (
    <>
      <ForgotPasswordStyleWrapper className="isoForgotPassPage">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{messages["page.forgetPassTitle"]} | HLS</title>
        </Helmet>
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">{messages["page.forgetPassTitle"]}</div>
            <div className="isoFormHeadText">
              {messages["page.forgetPassDescription"]}
            </div>
            <div className="isoForgotPassForm">
              <Formik
                onSubmit={onSubmit}
                validationSchema={validationSchema(messages)}
                initialValues={initialValues}
                render={() => (
                  <Form
                    name="basic1"
                    wrapperCol={{ lg: { span: 20, offset: 2 }, sx: { span: 24 } }}
                  >
                    <Form.Item name="email">
                      <Input
                        name="email"
                        prefix={<i className="ion-ios-email-outline" />}
                        placeholder={messages["page.forgetPassMailAddress"]}
                      />
                    </Form.Item>
                    <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 14, offset: 5 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          loading={loading}
                          className="btnSubmitForget"
                        >
                          {messages["page.forgetPassBtn"]}
                        </Button>
                      </Col>
                    </Row>
                    <Row justify={"center"}>
                      <Link to={PUBLIC_ROUTE.LANDING} className="toSignin">
                        {messages["page.forgetPass.backToSignin"]}
                      </Link>
                    </Row>
                  </Form>
                )}
              />
            </div>
            <div className="isoFormFootText">
              {messages["page.forgetPassDescription2"]}
            </div>
          </div>
        </div>
      </ForgotPasswordStyleWrapper>
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

const hiddenEmail = (email = "") => {
  const [prefix, domain] = email.split("@");
  return `${prefix.replace(/./gi, "*")}@${domain}`;
};

export default memo(ForgotPassword);
