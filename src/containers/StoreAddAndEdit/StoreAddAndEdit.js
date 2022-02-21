import React, { useCallback, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Col, Row, Modal } from "antd";
import { Form, Input, Select } from "formik-antd";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { isEmpty, pick, forEach } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { SELECT_CONTRACT_STATUS } from "@iso/constants/select.constant";
import DetailButtonGroup from "@iso/components/StoreAddEditComponent/DetailButtonGroup";
import storeActions from "@iso/redux/storeAddEdit/actions";
import otaActions from "@iso/redux/ota/actions";
import EditButtonGroup from "@iso/components/StoreAddEditComponent/EditButtonGroup";
import StoreOtaList from "@iso/components/StoreAddEditComponent/store-ota-list/StoreOtaList";
import { initOtaData } from "@iso/components/StoreAddEditComponent/store-ota-list/data";
import {
  ROLES,
  X_REQUESTED_STOREID,
  OTA_STATUS,
} from "@iso/constants/common.constant";
import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
  colFull,
  itemFullLabel,
} from "@iso/assets/styles/form.style";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";

import { LayoutEditStoreWrapper } from "./StoreAddAndEdit.styles";
import validationSchema from "./validation.schema";
import { Helmet } from "react-helmet";

export const OtaContext = React.createContext({});

const StoreAddAndEdit = () => {
  const { messages } = useIntl();
  const params = useParams();

  const [editorMode, setEditorMode] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState(initialValueDefault);
  const {
    StoreAddEdit: { store, chains, directors, otaOptionData },
  } = useSelector((state) => state);
  const { user, dashboardRoute } = useSelector((state) => state.Auth);
  const role = user.role;

  const isAdmin = role === ROLES.ADMIN || role === ROLES.SUBADMIN;
  const isStore = role === ROLES.STORE;
  const isUser = role === ROLES.USER;

  let storeId = isStore
    ? user.storeId || sessionStorage.getItem(X_REQUESTED_STOREID)
    : params.storeId;
  const accountNoHasStore = isStore && !storeId;

  useEffect(() => {
    dispatch(storeActions.getStoreMetadata());
    dispatch(otaActions.getOtaTypes());
    dispatch(otaActions.getOTAs({ size: 0, status: OTA_STATUS.ENABLED }));
    if (storeId) {
      dispatch(storeActions.getStoreDetail({ storeId }));
    }
  }, [dispatch, storeId]);

  useEffect(() => {
    if (storeId && !isEmpty(store)) {
      let otas = {};
      forEach(store.otas, (ota) => {
        if (!isEmpty(otas[ota.otaTypeId])) {
          otas[ota.otaTypeId].push(ota);
        } else {
          otas[ota.otaTypeId] = [ota];
        }
      });
      setInitialValues((prevState) => ({
        ...prevState,
        ...store,
        otas,
      }));
    }
  }, [storeId, store]);

  useEffect(() => {
    if (accountNoHasStore) {
      Modal.error({
        title: messages["page.storeAddEditEmail.modal.error"],
        content: messages["page.storeAddEditEmail.modal.errorAccountNoHasStore"],
        onOk: () => {
          history.push(dashboardRoute);
        },
      });
    }
  }, [accountNoHasStore, messages, history, dashboardRoute]);

  const onSubmit = useCallback(
    (data, form) => {
      const schema = validationSchema(messages);
      const dataTransform = schema.cast(data);
      const otas = [];
      forEach(dataTransform.otas, (value) => {
        otas.push(...value);
      });
      dataTransform.otas = otas;
      new Promise((resolve, reject) => {
        if (storeId) {
          const submitData = pick(dataTransform, [
            "contractStatus",
            "directorId",
            "managerMail",
            "managerName",
            "managerPhone",
            "name",
            "otas",
            "siteControllers",
            "chainId",
            "note",
          ]);
          return dispatch(
            storeActions.editStore({ storeId, data: submitData, resolve, reject })
          );
        }

        return dispatch(
          storeActions.createStore({ data: dataTransform, resolve, reject })
        );
      })
        .then(() => {
          if (!storeId) {
            Modal.success({
              title: messages["page.storeAddEditEmail.modal.success"],
              content: (
                <div>{messages["page.storeAddEditEmail.modal.addSuccess"]}</div>
              ),
            });
            form.resetForm();
          } else {
            dispatch(storeActions.getStoreDetail({ storeId }));
            setEditorMode(false);
            Modal.success({
              title: messages["page.storeAddEditEmail.modal.success"],
              content: (
                <div>{messages["page.storeAddEditEmail.modal.updateSuccess"]}</div>
              ),
            });
            form.setSubmitting(false);
          }
        })
        .catch(() => {
          const content = storeId ? (
            <div>{messages["page.storeAddEditEmail.modal.errorUpdate"]}</div>
          ) : (
            <div>{messages["page.storeAddEditEmail.modal.errorCreate"]}</div>
          );
          Modal.error({
            title: messages["page.storeAddEditEmail.modal.error"],
            content: content,
          });
          form.setSubmitting(false);
        });
    },
    [dispatch, storeId, messages]
  );

  const handleFormChange = useCallback(
    (setFieldValue) => (name, value) => {
      setFieldValue(name, value);
    },
    []
  );

  const editing = editorMode || !storeId;
  const pageTitle = isStore
    ? messages["sidebar.storeSetting"]
    : storeId
    ? messages["sidebar.editStore"]
    : messages["sidebar.addStore"];

  return (
    <LayoutEditStoreWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {!isStore && storeId ? `[施設${storeId}] ${initialValues.name} | ` : ""}
          {pageTitle} | HLS
        </title>
      </Helmet>
      <PageHeader>{pageTitle}</PageHeader>
      <LayoutContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema(messages, role, storeId)}
          render={({ values, isSubmitting, setFieldValue, resetForm, dirty }) => (
            <Form colon={false} labelAlign="left" className="hls-form">
              <Row justify="end">
                {!editing && (
                  <DetailButtonGroup
                    isSubmitting={isSubmitting}
                    editClick={() => setEditorMode(true)}
                    backClick={() =>
                      history.push(
                        isStore ? dashboardRoute : `${dashboardRoute}/stores`
                      )
                    }
                    disabledEdit={accountNoHasStore}
                  />
                )}
                {editing && (
                  <EditButtonGroup
                    isSubmitting={isSubmitting}
                    dirty={dirty}
                    cancelClick={() => {
                      if (storeId) {
                        setEditorMode(false);
                        resetForm();
                      } else {
                        history.push(`${dashboardRoute}/stores`);
                      }
                    }}
                  />
                )}
              </Row>
              <Row>
                <Col {...colLeft}>
                  <Form.Item
                    required
                    {...itemLeftLabel}
                    label={messages["page.storeAddEditEmail.contractStatus"]}
                    name="contractStatus"
                  >
                    <Select name="contractStatus" disabled={!isAdmin || !editing}>
                      {SELECT_CONTRACT_STATUS.map((select, index) => (
                        <Select.Option key={index} value={select}>
                          {select}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col {...colRight}>
                  <Form.Item
                    required
                    {...itemRightLabel}
                    label={messages["page.storeAddEditEmail.director"]}
                    name="directorId"
                  >
                    <Select name="directorId" disabled={!isAdmin || !editing}>
                      {directors.map((item, index) => (
                        <Select.Option key={index} value={item.directorId}>
                          {item.displayName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col {...colLeft}>
                  <Form.Item
                    {...itemLeftLabel}
                    required
                    name="name"
                    label={messages["page.storeAddEditEmail.storeName"]}
                  >
                    <Input name="name" disabled={isUser || !editing} />
                  </Form.Item>
                </Col>
                <Col {...colRight}>
                  <Form.Item
                    {...itemRightLabel}
                    required
                    name="managerName"
                    label={messages["page.storeAddEditEmail.managerName"]}
                  >
                    <Input name="managerName" disabled={isUser || !editing} />
                  </Form.Item>
                </Col>
                <Col {...colLeft}>
                  <Form.Item
                    {...itemLeftLabel}
                    name="chainId"
                    label={messages["page.storeAddEditEmail.chain"]}
                  >
                    <Select name="chainId" disabled={!isAdmin || !editing}>
                      {chains.map((select, index) => (
                        <Select.Option key={index} value={select.chainId}>
                          {select.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col {...colRight}>
                  <Form.Item
                    {...itemRightLabel}
                    required
                    name="managerMail"
                    label={messages["page.storeAddEditEmail.managerMail"]}
                  >
                    <Input name="managerMail" disabled={isUser || !editing} />
                  </Form.Item>
                </Col>
                <Col {...colLeft}>
                  <Form.Item
                    {...itemLeftLabel}
                    required
                    label={messages["page.storeAddEditEmail.managerPhone"]}
                    name="managerPhone"
                  >
                    <Input name="managerPhone" disabled={isUser || !editing} />
                  </Form.Item>
                </Col>
                <Col {...colFull}>
                  <Form.Item
                    {...itemFullLabel}
                    name="remarks"
                    label={messages["page.storeAddEditEmail.remarks"]}
                  >
                    <Input.TextArea
                      rows={5}
                      name="note"
                      disabled={isUser || !editing}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <OtaContext.Provider value={values.otas}>
                    <StoreOtaList
                      otaOptionData={otaOptionData}
                      onFormChange={handleFormChange(setFieldValue)}
                      otas={values.otas}
                      editing={editing}
                    />
                  </OtaContext.Provider>
                </Col>
              </Row>
            </Form>
          )}
        />
      </LayoutContent>
    </LayoutEditStoreWrapper>
  );
};

const initialValueDefault = {
  contractStatus: "",
  directorId: null,
  name: "",
  managerName: "",
  chainId: null,
  managerPhone: "",
  managerMail: "",
  note: "",
  otas: initOtaData,
};

export default StoreAddAndEdit;
