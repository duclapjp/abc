import React, { useCallback, useEffect, useState } from "react";
import { Row, Button, Col, Modal, Space } from "antd";
import { useIntl } from "react-intl";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import validationSchema from "./validation.schema";
import AccountAction from "@iso/redux/accountSetting/actions";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, pick, set } from "lodash";
import { Helmet } from "react-helmet";

const AccountSetting = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AccountSetting);
  const [account, setAccount] = useState(initialValueDefault);

  useEffect(() => {
    dispatch(AccountAction.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(user)) {
      setAccount(
        pick({ ...user, password: "", newPassword: "" }, [
          "role",
          "mail",
          "displayName",
          "phone",
          "notiDest",
          "mailSetting",
          "slackSetting",
          "chatworkSetting",
          "lineSetting",
          "viberRakutenSetting",
          "password",
          "newPassword",
        ])
      );
    }
  }, [user]);

  const onSubmit = useCallback(
    (data, form) => {
      const schema = validationSchema(messages);
      const dataTransform = schema.cast(data);
      new Promise((resolve, reject) => {
        if (dataTransform.phone === "") set(dataTransform, "phone", null);
        dispatch(AccountAction.updateUser({ data: dataTransform, reject, resolve }));
      })
        .then(() => {
          Modal.success({
            title: messages["page.Account.Success"],
            content: messages["page.Account.UpdateSuccess"],
            okText: messages["page.Account.Ok"],
            cancelText: messages["page.Account.Cancel"],
          });
          form.setSubmitting(false);
          form.setFieldValue("password", "");
          form.setFieldValue("newPassword", "");
        })
        .catch(() => {
          Modal.error({
            title: messages["page.Account.Error"],
            content: messages["page.Account.UpdateError"],
            okText: messages["page.Account.Ok"],
            cancelText: messages["page.Account.Cancel"],
          });
          form.setSubmitting(false);
        });
    },
    [messages, dispatch]
  );

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["sidebar.accountSetting"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["sidebar.accountSetting"]}</PageHeader>
      <LayoutContent>
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema(messages)}
          initialValues={account}
          enableReinitialize={true}
          render={({ isSubmitting, resetForm, values, dirty }) => (
            <Form colon={false} labelAlign="left" className="hls-form">
              <Row justify="end" style={{ marginBottom: 24 }}>
                <Space align="end">
                  <Button
                    onClick={() => resetForm()}
                    htmlType="button"
                    disabled={!dirty || isSubmitting}
                  >
                    {messages["page.Account.buttonCancel"]}
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    disabled={!dirty}
                  >
                    {messages["page.Account.buttonSave"]}
                  </Button>
                </Space>
              </Row>
              <Row justify={"center"}>
                <Col {...colWrap}>
                  <Row gutter={styleComponent.gutter}>
                    <Col sm={12} xs={24}>
                      <Row style={styleComponent.styRowHeader}>
                        <Col {...colHeader}>
                          <h3 style={styleComponent.styHeader}>
                            {messages["page.Account.accountType"]}
                          </h3>
                        </Col>
                      </Row>
                      <Form.Item
                        {...formItemLayout}
                        label={messages["page.Account.accountType"]}
                        name="role"
                      >
                        <Input
                          disabled
                          value={
                            messages[`page.Account.${account.role.toLowerCase()}`]
                          }
                          name={"role"}
                          readOnly={true}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={styleComponent.gutter}>
                    <Col sm={12} xs={24}>
                      <Row style={styleComponent.styRowHeader}>
                        <Col {...colHeader}>
                          <h3 style={styleComponent.styHeader}>
                            {messages["page.Account.accountSetting"]}
                          </h3>
                        </Col>
                      </Row>
                      <Row sm={24} xs={24}>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.emailAddress"]}
                            name="mail"
                          >
                            <Input disabled name="mail" autoComplete={"Email"} />
                          </Form.Item>
                        </Col>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.displayName"]}
                            name="displayName"
                            required
                          >
                            <Input name="displayName" autoComplete={"new-showing"} />
                          </Form.Item>
                        </Col>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.phoneNumber"]}
                            name="phone"
                          >
                            <Input name="phone" autoComplete={"new-notice"} />
                          </Form.Item>
                        </Col>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.noticeFirst"]}
                            name="notiDest"
                          >
                            <Input name="notiDest" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row style={styleComponent.styRowHeader}>
                        <Col {...colHeader}>
                          <h3 style={styleComponent.styHeader}>
                            {messages["page.Account.notification"]}
                          </h3>
                        </Col>
                      </Row>
                      <Row sm={24} xs={24}>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.email"]}
                            name="mailSetting"
                          >
                            <Input name="mailSetting" />
                          </Form.Item>
                        </Col>
                        {/* <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.slack"]}
                            name="slackSetting"
                          >
                            <Input name="slackSetting" />
                          </Form.Item>
                        </Col>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.chat"]}
                            name="chatworkSetting"
                          >
                            <Input name="chatworkSetting" />
                          </Form.Item>
                        </Col>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.line"]}
                            name="lineSetting"
                          >
                            <Input name="lineSetting" />
                          </Form.Item>
                        </Col>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.rakutenViber"]}
                            name="viberRakutenSetting"
                          >
                            <Input name="viberRakutenSetting" />
                          </Form.Item>
                        </Col> */}
                      </Row>
                    </Col>
                    <Col sm={12} xs={24}>
                      <Row style={styleComponent.styRowHeader}>
                        <Col {...colHeader}>
                          <h3 style={styleComponent.styHeader}>
                            {messages["page.Account.settingPassword"]}
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.newPassword"]}
                            name="password"
                          >
                            <Input.Password
                              name="password"
                              autoComplete={"new-password"}
                            />
                          </Form.Item>
                        </Col>
                        <Col {...colFullWidth}>
                          <Form.Item
                            {...formItemLayout}
                            label={messages["page.Account.reNewPassword"]}
                            name="newPassword"
                          >
                            <Input.Password
                              name="newPassword"
                              autoComplete={"new-password"}
                              disabled={!(values.password && values.password.length)}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          )}
        />
      </LayoutContent>
    </LayoutWrapper>
  );
};

const formItemLayout = {
  labelCol: {
    lg: { span: 8, offset: 2 },
    md: { span: 9, offset: 1 },
    sm: { span: 14 },
    xs: { span: 24 },
  },
  wrapperCol: {
    lg: { span: 14 },
    md: { span: 14 },
    sm: { span: 10 },
    xs: { span: 24 },
  },
};

const styleComponent = {
  gutter: [20, 0],
  styRowHeader: { marginBottom: 20, marginTop: 10 },
  styHeader: { color: "#333", fontWeight: "bold" },
};

const colHeader = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: { span: 10, offset: 1 },
};

const colWrap = {
  xl: 24,
  md: 24,
  xs: 24,
};

const colFullWidth = {
  xs: 24,
  sm: 24,
};

const initialValueDefault = {
  role: "",
  mail: "",
  phone: null,
  displayName: "",
  mailSetting: "",
  slackSetting: "",
  chatworkSetting: "",
  lineSetting: "",
  viberRakutenSetting: "",
  notiDest: "",
  password: "",
  newPassword: "",
};

export default AccountSetting;
