import React, { memo, useCallback, useEffect, useState } from "react";
import { Row, Button, Col, Modal, Space } from "antd";
import { useIntl } from "react-intl";
import { Form, Input, Select } from "formik-antd";
import { Formik, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { isEmpty } from "lodash";

import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";
import chainActions from "@iso/redux/chain/actions";
import ChainAddAndEditStyle from "./ChainAddAndEdit.styles";
import validationSchema from "./Validation.schema";
import { SELECT_CONTRACT_STATUS } from "@iso/constants/select.constant";
import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
  colFull,
  itemFullLabel,
} from "@iso/assets/styles/form.style";
import { Helmet } from "react-helmet";

const ChainAddAndEdit = () => {
  const { chainId } = useParams();
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const [editorMode, setEditorMode] = useState(!chainId);
  const [initialValues, setInitialValues] = useState(initialValueDefaults);
  const { directorOptions, chain, storeOptions } = useSelector(
    (state) => state.Chain
  );
  const dashboardRoute = useSelector((state) => state.Auth.dashboardRoute);

  useEffect(() => {
    dispatch(
      chainActions.getMetadata({
        filter: "chain_id:null",
        chainId,
      })
    );
    if (chainId) {
      dispatch(chainActions.getChain({ id: chainId }));
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    if (chainId && !isEmpty(chain)) {
      chain.storeIds = chain.storeIds.length ? chain.storeIds : [""];
      setInitialValues(chain);
    }
  }, [chainId, chain]);

  const onSubmit = useCallback(
    (data, form) => {
      const schema = validationSchema(messages);
      const dataTransform = schema.cast(data);
      const previousStoreIds = chain.storeIds;
      dataTransform["storeIds"] = dataTransform["storeIds"].filter((id) => !!id);
      return new Promise((resolve, reject) =>
        chainId
          ? dispatch(
              chainActions.editChain({
                ...dataTransform,
                id: chainId,
                previousStoreIds,
                resolve,
                reject,
              })
            )
          : dispatch(chainActions.addChain({ ...dataTransform, resolve, reject }))
      )
        .then(() => {
          Modal.success({
            title: messages["page.modal.title.success"],
            content: chainId
              ? messages["page.chains.modal.update.success"]
              : messages["page.chains.modal.create.success"],
          });
          dataTransform.storeIds = dataTransform.storeIds.length
            ? dataTransform.storeIds
            : [null];
          chainId ? setInitialValues(dataTransform) : form.resetForm();
          form.setSubmitting(false);
        })
        .catch(() => {
          Modal.error({
            title: messages["page.modal.title.error"],
            content: chainId
              ? messages["page.chains.modal.update.error"]
              : messages["page.chains.modal.create.error"],
          });
          form.setSubmitting(false);
        });
    },
    [chainId, dispatch, chain.storeIds]
  );

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {chainId
            ? `[チェーン${chainId}] ${initialValues.name} | ${messages["page.chainEdit.title"]} | HLS`
            : `${messages["page.chainAdd.title"]} | HLS`}
        </title>
      </Helmet>
      <PageHeader>
        {chainId
          ? messages["page.chainEdit.title"]
          : messages["page.chainAdd.title"]}
      </PageHeader>
      <LayoutContent>
        <ChainAddAndEditStyle>
          <Formik
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={validationSchema(messages)}
            initialValues={initialValues}
            render={({ values, isSubmitting, dirty, resetForm }) => (
              <Form colon={false} labelAlign="left" className="hls-form">
                <Row justify="end" style={{ marginBottom: 24 }}>
                  <Space align="end">
                    {chainId && !editorMode && (
                      <Button
                        htmlType="button"
                        disabled={isSubmitting}
                        onClick={() => history.push(`${dashboardRoute}/chains`)}
                      >
                        {messages["page.btn.back"]}
                      </Button>
                    )}
                    {editorMode && (
                      <Button
                        htmlType="button"
                        disabled={isSubmitting}
                        onClick={() => {
                          chainId && setEditorMode(false);
                          resetForm();
                        }}
                      >
                        {messages["page.btn.cancel"]}
                      </Button>
                    )}
                    {chainId && !editorMode && (
                      <Button
                        htmlType="button"
                        type="primary"
                        onClick={() => setEditorMode(true)}
                      >
                        {messages["page.btn.edit"]}
                      </Button>
                    )}
                    {(!chainId || editorMode) && (
                      <Button
                        htmlType="submit"
                        type="primary"
                        disabled={!dirty}
                        loading={isSubmitting}
                      >
                        {messages["page.btn.save"]}
                      </Button>
                    )}
                  </Space>
                </Row>
                <Row>
                  <Col {...colLeft}>
                    <Form.Item
                      {...itemLeftLabel}
                      label={messages["page.chains.contractStatus"]}
                      name="contractStatus"
                      required
                    >
                      <Select
                        className="select"
                        name="contractStatus"
                        disabled={!editorMode}
                      >
                        {SELECT_CONTRACT_STATUS.map((status, index) => (
                          <Select.Option value={status} key={index}>
                            {status}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col {...colRight}>
                    <Form.Item
                      {...itemRightLabel}
                      label={messages["page.chains.chainName"]}
                      name="name"
                      required
                    >
                      <Input name="name" allowClear disabled={!editorMode} />
                    </Form.Item>
                  </Col>
                  <Col {...colLeft}>
                    <Form.Item
                      {...itemLeftLabel}
                      label={messages["page.chains.table.directorCharge1"]}
                      name="directorId1"
                      required
                    >
                      <Select
                        className="select"
                        name="directorId1"
                        allowClear
                        disabled={!editorMode}
                      >
                        {directorOptions.map((director) => (
                          <Select.Option
                            value={director.directorId}
                            key={director.directorId}
                            disabled={
                              [values.directorId2, values.directorId3].indexOf(
                                director.directorId
                              ) > -1
                            }
                          >
                            {director["displayName"]}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col {...colRight}>
                    <Form.Item
                      {...itemRightLabel}
                      label={messages["page.chains.table.directorCharge2"]}
                      name="directorId2"
                    >
                      <Select
                        className="select"
                        name="directorId2"
                        allowClear
                        disabled={!editorMode}
                      >
                        {directorOptions.map((director) => (
                          <Select.Option
                            value={director.directorId}
                            key={director.directorId}
                            disabled={
                              [values.directorId1, values.directorId3].indexOf(
                                director.directorId
                              ) > -1
                            }
                          >
                            {director["displayName"]}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col {...colLeft}>
                    <Form.Item
                      {...itemLeftLabel}
                      label={messages["page.chains.table.directorCharge3"]}
                      name="directorId3"
                    >
                      <Select
                        className="select"
                        name="directorId3"
                        allowClear
                        disabled={!editorMode}
                      >
                        {directorOptions.map((director) => (
                          <Select.Option
                            value={director.directorId}
                            key={director.directorId}
                            disabled={
                              [values.directorId1, values.directorId2].indexOf(
                                director.directorId
                              ) > -1
                            }
                          >
                            {director["displayName"]}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col {...colRight}>
                    <Form.Item
                      {...itemRightLabel}
                      label={messages["page.chains.chainManagerEmail"]}
                      name="managerMail"
                      required
                    >
                      <Input name="managerMail" allowClear disabled={!editorMode} />
                    </Form.Item>
                  </Col>
                  <Col {...colFull}>
                    <Form.Item
                      {...itemFullLabel}
                      label={messages["page.chains.remarks"]}
                      name="note"
                    >
                      <Input.TextArea
                        rows={4}
                        name="note"
                        allowClear
                        disabled={!editorMode}
                      />
                    </Form.Item>
                  </Col>
                  <Col {...colLeft}>
                    <Form.Item
                      labelCol={{ lg: 8, xs: 24 }}
                      wrapperCol={{ lg: 16, xs: 24 }}
                      label={messages["page.chains.facilityName"]}
                      name="stores.label"
                    >
                      <FieldArray
                        name="storeIds"
                        render={(arrayHelpers) =>
                          values.storeIds &&
                          values.storeIds.length > 0 &&
                          values.storeIds.map((storeId, index) => (
                            <Row key={index}>
                              <Col lg={18} xs={editorMode ? 16 : 24}>
                                <Form.Item name={`storeIds.${index}`}>
                                  <Select
                                    className="select"
                                    name={`storeIds.${index}`}
                                    disabled={!editorMode}
                                  >
                                    {storeOptions.map((store) => (
                                      <Select.Option
                                        value={store.storeId}
                                        key={store.storeId}
                                        disabled={
                                          values.storeIds[index] !== store.storeId &&
                                          values.storeIds.indexOf(store.storeId) > -1
                                        }
                                      >
                                        {store["name"]}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              {editorMode && (
                                <Col lg={6} xs={8}>
                                  <Button
                                    type="dashed"
                                    disabled={values.storeIds.length <= 1}
                                    style={{ marginRight: 4, marginLeft: 4 }}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    -
                                  </Button>
                                  <Button
                                    type="dashed"
                                    disabled={
                                      values.storeIds.length >= storeOptions.length
                                    }
                                    onClick={() => arrayHelpers.push(null)}
                                  >
                                    +
                                  </Button>
                                </Col>
                              )}
                            </Row>
                          ))
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}
          />
        </ChainAddAndEditStyle>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const initialValueDefaults = {
  contractStatus: "",
  name: "",
  directorId1: "",
  directorId2: "",
  directorId3: "",
  managerMail: "",
  note: "",
  storeIds: [null],
};

export default memo(ChainAddAndEdit);
