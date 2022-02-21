import React, { useState, useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import { useParams, useHistory } from "react-router-dom";
import { Formik } from "formik";
import { Form, Input, Select, SubmitButton, InputNumber, Switch } from "formik-antd";
import { Row, Col, Button, Space, Modal, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import otaActions from "@iso/redux/ota/actions";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";

import { OTAAddAndEditStyles } from "./OTAAddAndEdit.styles";
import validationSchema from "./validation.schema";
import { Helmet } from "react-helmet";

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

const OTAAddAndEdit = () => {
  const [initialValues, setInitialValues] = useState(initialValuesDefault);
  const { otaId } = useParams();
  const { messages } = useIntl();
  const { requesting, requestingTypes, otaTypes, ota } = useSelector(
    (state) => state.OTA
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const fetching = otaId && requesting;

  useEffect(() => {
    dispatch(otaActions.getOtaTypes());
    if (otaId) {
      dispatch(otaActions.getOTA({ otaId }));
    }
  }, [dispatch, otaId]);

  useEffect(() => {
    if (otaId && !isEmpty(ota)) {
      setInitialValues(ota);
    }
  }, [otaId, ota]);

  const onSubmit = useCallback(
    (data, { setSubmitting, resetForm }) => {
      new Promise((resolve, reject) => {
        const payload = { data, resolve, reject };
        const action = otaId ? "updateOTA" : "createOTA";
        dispatch(otaActions[action](payload));
      })
        .then(() => {
          !otaId && resetForm();
          Modal.success({
            title: messages["page.storeAddEditEmail.modal.success"],
            content:
              messages[
                `page.otaDetail.${otaId ? "updateSuccess" : "createSuccess"}`
              ],
          });
        })
        .catch(() => {
          Modal.error({
            title: messages["page.storeAddEditEmail.modal.error"],
            content:
              messages[`page.otaDetail.${otaId ? "updateError" : "createError"}`],
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [dispatch, messages, otaId]
  );

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {otaId
            ? `[OTA${otaId}] ${initialValues.name} | ${messages["page.upload.title"]} | HLS`
            : `${messages["page.upload.title"]} | HLS`}
        </title>
      </Helmet>
      <PageHeader>{messages["page.otaDetail.title"]}</PageHeader>
      <LayoutContent>
        <OTAAddAndEditStyles>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema(messages)}
            enableReinitialize
          >
            {({ dirty }) => (
              <Form colon={false} labelAlign="left" {...layoutItems}>
                <Row justify="end" className="mb-24">
                  <Space>
                    <Button onClick={() => history.goBack()}>
                      {messages["page.btn.cancel"]}
                    </Button>
                    <SubmitButton disabled={!dirty}>
                      {messages["page.taskAddEdit.buttonSave"]}
                    </SubmitButton>
                  </Space>
                </Row>
                <Row>
                  <Col {...colLeftRight}>
                    <Item
                      label={messages["page.otaList.th.type"]}
                      name="otaTypeId"
                      required
                    >
                      <Select
                        name="otaTypeId"
                        allowClear
                        loading={requestingTypes}
                        disabled={requestingTypes}
                      >
                        {otaTypes.map((item, idx) => (
                          <Option key={idx} value={item.otaTypeId}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col {...colLeftRight}>
                    <Item
                      label={messages["page.otaList.th.serviceName"]}
                      name="name"
                      required
                    >
                      {fetching ? <Skeleton.Input active /> : <Input name="name" />}
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col {...colFull}>
                    <Row>
                      <Col {...colLeftRight}>
                        <Item
                          label={messages["page.otaDetail.loginUrl"]}
                          name="loginUrlFixed1"
                          required
                        >
                          {fetching ? (
                            <Skeleton.Input active />
                          ) : (
                            <Input name="loginUrlFixed1" />
                          )}
                        </Item>
                      </Col>
                      <Col {...colMid}>
                        <Item name="subUrl" className="sub-url justify-content-end">
                          {fetching ? (
                            <Skeleton.Input active />
                          ) : (
                            <Input
                              disabled
                              name="subUrl"
                              value={messages["page.otaDetail.subUrl"]}
                            />
                          )}
                        </Item>
                      </Col>
                      <Col {...colLeftRight}>
                        <Item
                          name="loginUrlFixed2"
                          className="justify-content-end"
                          required
                        >
                          {fetching ? (
                            <Skeleton.Input active />
                          ) : (
                            <Input name="loginUrlFixed2" />
                          )}
                        </Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col xs={18} md={18} lg={9} xl={10}>
                    <Item
                      label={messages["page.otaDetail.storeID"]}
                      name="storeId"
                      className="justify-content-end"
                      labelCol={{ xs: 6, sm: 12, lg: 13, xl: 12 }}
                      wrapperCol={{ xs: 18, sm: 12, lg: 11, xl: 12 }}
                    >
                      {fetching ? (
                        <Skeleton.Input active />
                      ) : (
                        <Input name="storeId" disabled />
                      )}
                    </Item>
                  </Col>
                  <Col xs={6} md={6} lg={9} xl={10}>
                    <Item
                      label={<span />}
                      name="displayStoreId"
                      labelCol={{ sm: 0, lg: 2, xl: 2 }}
                      wrapperCol={{ sm: 24, lg: 6, xl: 4 }}
                      className="text-right"
                    >
                      <Switch
                        name="displayStoreId"
                        checkedChildren={messages["page.otaList.checkbox.checked"]}
                        unCheckedChildren={
                          messages["page.otaList.checkbox.unchecked"]
                        }
                        defaultChecked={false}
                      />
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col {...colLeftRight}>
                    <Item
                      label={messages["page.otaDetail.loginID"]}
                      name="loginId"
                      // required
                    >
                      {fetching ? (
                        <Skeleton.Input active />
                      ) : (
                        <Input name="loginId" disabled />
                      )}
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col {...colLeftRight}>
                    <Item
                      label={messages["page.storeAddEditEmail.password"]}
                      name="password"
                      // required
                    >
                      {fetching ? (
                        <Skeleton.Input active />
                      ) : (
                        <Input name="password" disabled />
                      )}
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col {...colLeftRight}>
                    <Item
                      label={messages["page.otaList.th.deadline"]}
                      name="passwordUpdateDeadline"
                    >
                      {fetching ? (
                        <Skeleton.Input active />
                      ) : (
                        <InputNumber
                          name="passwordUpdateDeadline"
                          className="w-100"
                          min={0}
                        />
                      )}
                    </Item>
                  </Col>
                </Row>
                <Row>
                  <Col {...colLeftRight}>
                    <Item
                      label={messages["page.storeAddEditEmail.remarks"]}
                      name="note"
                    >
                      {fetching ? (
                        <Skeleton.Input active />
                      ) : (
                        <TextArea name="note" autoSize />
                      )}
                    </Item>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </OTAAddAndEditStyles>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const initialValuesDefault = {
  otaTypeId: "",
  name: "",
  loginUrlFixed1: "https://",
  loginUrlFixed2: "",
  storeId: "",
  loginId: "",
  password: "",
  passwordUpdateDeadline: null,
  note: "",
  displayStoreId: false,
};

const colFull = {
  xs: { span: 24 },
  lg: { span: 24 },
};

const colLeftRight = {
  xs: { span: 24 },
  lg: { span: 9 },
  xl: { span: 10 },
};

const colMid = {
  xs: { span: 24 },
  lg: { span: 6 },
  xl: { span: 4 },
};

const layoutItems = {
  labelCol: { xs: 6, sm: 9, lg: 13, xl: 12 },
  wrapperCol: { xs: 18, sm: 15, lg: 11, xl: 12 },
};

export default OTAAddAndEdit;
