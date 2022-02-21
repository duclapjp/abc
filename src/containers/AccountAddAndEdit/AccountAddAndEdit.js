import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";
import { Button, Col, Row, Modal, Space } from "antd";
import { Form, Input, Select } from "formik-antd";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { isEmpty, pick, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "@iso/constants/common.constant";
import {
  SELECT_ROLES_ADMIN,
  SELECT_ROLES_CHAIN,
  SELECT_ROLES_STORE,
  SELECT_STATUS,
  SELECT_DISABLE_CHAIN,
  SELECT_DISABLE_STORE,
  INPUT_DISABLE_EMAIL,
} from "@iso/constants/select.constant";
import { Helmet } from "react-helmet";

import AccountAddAndEditStyle from "./AccountAddAndEdit.styles";
import validationSchema from "./validation.schema";
import accountActions from "@iso/redux/account/actions";
import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
  colFull,
  itemFullLabel,
} from "@iso/assets/styles/form.style";

const AccountAddAndEdit = () => {
  const { messages } = useIntl();
  const { accountId } = useParams();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(initialValueDefault);
  const { account, chains, stores } = useSelector((state) => state.Account);
  const { role, chainId } = useSelector((state) => state.Auth.user);

  let roles;
  switch (role) {
    case ROLES.ADMIN:
      roles = SELECT_ROLES_ADMIN;
      break;
    case ROLES.CHAIN:
      roles = SELECT_ROLES_CHAIN;
      break;
    case ROLES.SUBADMIN:
      roles = SELECT_ROLES_ADMIN;
      break;
    default:
      roles = SELECT_ROLES_STORE;
  }

  useEffect(() => {
    dispatch(accountActions.getChainsData());
    if (chainId && role === ROLES.CHAIN) {
      dispatch(accountActions.getStoresData({ chainIdValue: chainId }));
    } else {
      dispatch(accountActions.getStoresData({}));
    }
    if (accountId) {
      dispatch(accountActions.getAccount({ accountId }));
    }
  }, [dispatch, accountId, chainId, role]);

  useEffect(() => {
    if (accountId && !isEmpty(account)) {
      setInitialValues(getInitialValueByRole(account));
    }
  }, [accountId, account]);

  const enableEmail =
    !accountId ||
    role === ROLES.ADMIN ||
    (role === ROLES.CHAIN && [ROLES.CHAIN, ROLES.STORE].includes(account.role)) ||
    (role === ROLES.STORE && ROLES.STORE === account.role);

  const handleChangeChain = useCallback(
    (setFieldValue) => (chainIdValue) => {
      dispatch(accountActions.getStoresData({ chainIdValue }));
      setFieldValue("storeId", "");
    },
    [dispatch]
  );

  const onSubmit = useCallback(
    (data, form) => {
      const schema = validationSchema(messages);
      const dataTransform = schema.cast(data);
      new Promise((resolve, reject) => {
        if (dataTransform.phone === "") set(dataTransform, "phone", null);
        if (accountId) {
          return dispatch(
            accountActions.editAccount({
              accountId,
              data: dataTransform,
              resolve,
              reject,
            })
          );
        }
        if (role === ROLES.CHAIN) {
          Object.assign(dataTransform, { chainId });
        }

        return dispatch(
          accountActions.createAccount({ data: dataTransform, resolve, reject })
        );
      })
        .then(() => {
          if (!accountId) {
            Modal.success({
              title: messages["page.Account.modal.success"],
              content: <div>{messages["page.Account.modal.accountAddSuccess"]}</div>,
            });
            form.resetForm();
          } else {
            Modal.success({
              title: messages["page.Account.modal.success"],
              content: (
                <div>{messages["page.Account.modal.accountUpdateSuccess"]}</div>
              ),
            });
            setInitialValues(getInitialValueByRole(dataTransform));
            form.setSubmitting(false);
          }
        })
        .catch(() => {
          const content = accountId ? (
            <div>{messages["page.Account.modal.errorUpdateAccount"]}</div>
          ) : (
            <div>{messages["page.Account.modal.errorCreateAccount"]}</div>
          );
          Modal.error({
            title: messages["page.Account.modal.error"],
            content: content,
          });
          form.setSubmitting(false);
        });
    },
    [dispatch, accountId, messages, chainId, role]
  );

  const handleChangeRole = useCallback(
    (setFieldValue) => (role) => {
      setFieldValue("role", role);
      if ([ROLES.ADMIN, ROLES.USER, ROLES.SUBADMIN].includes(role)) {
        setFieldValue("storeId", "");
        setFieldValue("chainId", "");
      }
      if (role === ROLES.CHAIN) {
        setFieldValue("storeId", "");
      }
    },
    []
  );

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {accountId
            ? `[アカウント${accountId}] ${initialValues.displayName} | ${messages["sidebar.editAccount"]} | HLS`
            : `${messages["sidebar.addAccount"]} | HLS`}
        </title>
      </Helmet>
      <PageHeader>
        {accountId
          ? messages["sidebar.editAccount"]
          : messages["sidebar.addAccount"]}
      </PageHeader>
      <LayoutContent>
        <AccountAddAndEditStyle>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema(messages, role, accountId)}
            render={({ values, isSubmitting, resetForm, dirty, setFieldValue }) => (
              <Form colon={false} labelAlign="left" className="hls-form">
                <Row justify="end" style={{ marginBottom: 24 }}>
                  <Space align="end">
                    <Button
                      type="default"
                      htmlType="button"
                      disabled={isSubmitting || !dirty}
                      onClick={() => resetForm()}
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
                <Row>
                  <Col {...colLeft}>
                    <Form.Item
                      required
                      {...itemLeftLabel}
                      label={messages["page.Account.role"]}
                      name="role"
                    >
                      <Select name="role" onChange={handleChangeRole(setFieldValue)}>
                        {roles.map((select, index) => (
                          <Select.Option key={index} value={select}>
                            {messages[`page.Account.${select.toLowerCase()}`]}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col {...colRight}>
                    {role === ROLES.ADMIN ? (
                      <Form.Item
                        required
                        name="status"
                        label={messages["page.Account.status"]}
                        {...itemRightLabel}
                      >
                        <Select name="status">
                          {SELECT_STATUS.map((select, index) => (
                            <Select.Option key={index} value={select}>
                              {messages[`page.Account.${select.toLowerCase()}`]}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : (
                      role === ROLES.CHAIN && (
                        <Form.Item
                          required={!SELECT_DISABLE_STORE.includes(values.role)}
                          {...itemRightLabel}
                          name="storeId"
                          label={messages["page.Account.store"]}
                        >
                          <Select
                            name="storeId"
                            disabled={SELECT_DISABLE_STORE.includes(values.role)}
                          >
                            {stores.map((select) => (
                              <Select.Option
                                key={select.storeId}
                                value={select.storeId}
                              >
                                {select.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      )
                    )}
                  </Col>
                  {role === ROLES.ADMIN && (
                    <>
                      <Col {...colLeft}>
                        <Form.Item
                          {...itemLeftLabel}
                          name="chainId"
                          label={messages["page.Account.chain"]}
                        >
                          <Select
                            name="chainId"
                            onChange={handleChangeChain(setFieldValue)}
                            disabled={SELECT_DISABLE_CHAIN.includes(values.role)}
                          >
                            <Select.Option value={""} />
                            {chains.map((select) => (
                              <Select.Option
                                key={select.chainId}
                                value={select.chainId}
                              >
                                {select.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col {...colRight} />
                      <Col {...colLeft}>
                        <Form.Item
                          required={!SELECT_DISABLE_STORE.includes(values.role)}
                          {...itemLeftLabel}
                          name="storeId"
                          label={messages["page.Account.store"]}
                        >
                          <Select
                            name="storeId"
                            disabled={SELECT_DISABLE_STORE.includes(values.role)}
                          >
                            <Select.Option value={""} />
                            {stores.map((select) => (
                              <Select.Option
                                key={select.storeId}
                                value={select.storeId}
                              >
                                {select.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col {...colRight} />
                    </>
                  )}
                  <Col {...colLeft}>
                    <Form.Item
                      required={
                        role === ROLES.ADMIN || accountId
                          ? !INPUT_DISABLE_EMAIL.includes(role)
                          : true
                      }
                      {...itemLeftLabel}
                      label={messages["page.Account.emailAddress"]}
                      name="mail"
                    >
                      <Input name="mail" disabled={!enableEmail} />
                    </Form.Item>
                  </Col>
                  <Col {...colRight}>
                    <Form.Item
                      label={messages["page.Account.phoneNumber"]}
                      name="phone"
                      {...itemRightLabel}
                    >
                      <Input name="phone" />
                    </Form.Item>
                  </Col>
                  <Col {...colLeft}>
                    <Form.Item
                      required
                      {...itemLeftLabel}
                      label={messages["page.Account.username"]}
                      name="displayName"
                    >
                      <Input name="displayName" />
                    </Form.Item>
                  </Col>
                  <Col {...colFull}>
                    <Form.Item
                      {...itemFullLabel}
                      name="note"
                      label={messages["page.Account.remarks"]}
                    >
                      <Input.TextArea rows={5} name="note" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}
          />
        </AccountAddAndEditStyle>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const initialValueDefault = {
  role: "",
  status: "利用中",
  chainId: "",
  storeId: "",
  mail: "",
  phone: null,
  displayName: "",
  note: "",
};

const getInitialValueByRole = (initial) => {
  initial = pick(initial, [
    "role",
    "status",
    "chainId",
    "storeId",
    "mail",
    "phone",
    "displayName",
    "note",
  ]);
  if ([ROLES.ADMIN, ROLES.USER, ROLES.SUBADMIN].includes(initial.role)) {
    initial.storeId = "";
    initial.chainId = "";
  }
  if (initial.role === ROLES.CHAIN) {
    initial.storeId = "";
  }
  return initial;
};

export default AccountAddAndEdit;
