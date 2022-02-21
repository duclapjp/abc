import React, { useEffect, useState } from "react";
import { Row, Col, Table, Typography, Skeleton } from "antd";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import classnames from "classnames";

import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";
import { ROLES, X_REQUESTED_STOREID } from "@iso/constants/common.constant";
import { API_ENDPOINTS } from "@iso/constants/apiEndpoints.constant";
import { getAccessToken } from "@iso/lib/helpers/utility";
import helpAction from "@iso/redux/help/actions";

import { HelpStyles } from "./Help.style";
import { Helmet } from "react-helmet";

const { Title, Text } = Typography;

const ChainHelp = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.Auth.user);
  const { role, chainId } = currentUser;
  const sessionStoreId = sessionStorage.getItem(X_REQUESTED_STOREID);
  const storeId = currentUser.storeId || sessionStoreId;

  const { stores, store, fileExist, loading } = useSelector((state) => state.Help);

  const [listStore, setData] = useState([]);
  const [storeDetail, setDetail] = useState(initialValues);

  useEffect(() => {
    dispatch(helpAction.getFileRequest());
    if (role === ROLES.STORE || !!sessionStoreId) {
      dispatch(
        helpAction.getStoreData({
          storeId,
        })
      );
    } else {
      dispatch(helpAction.getChainData({ chainId }));
    }
  }, [chainId, dispatch, role, sessionStoreId, storeId]);

  useEffect(() => {
    if (!storeId) {
      setData(stores);
    } else {
      setDetail(store);
    }
  }, [stores, store, storeId]);

  const columns = (messages) => {
    return [
      {
        title: messages["page.help.facility"],
        dataIndex: "store_name",
        key: "store_name",
        width: "25%",
        align: "center",
      },
      {
        title: messages["page.help.contactName"],
        dataIndex: "manager_name",
        key: "manager_name",
        width: "25%",
        align: "center",
      },
      {
        title: messages["page.Account.phoneNumber"],
        dataIndex: "manager_phone",
        key: "manager_phone",
        width: "25%",
        align: "center",
      },
      {
        title: messages["page.Account.emailAddress"],
        dataIndex: "manager_mail",
        key: "manager_mail",
        width: "25%",
        align: "center",
      },
    ];
  };

  const onDownloadPdf = () => {
    const token = getAccessToken();
    const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_API_PRE_ENDPOINT}${API_ENDPOINTS.HELP_MANUAL_DOWNLOAD}${token}`;
    const anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.setAttribute("download", "download");
    anchor.setAttribute("target", "_blank");
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {role === ROLES.CHAIN && !sessionStoreId
            ? `${messages["page.chainsHelp"]} | HLS`
            : `${messages["page.storeHelp"]} | HLS`}
        </title>
      </Helmet>
      <PageHeader>
        {role === ROLES.CHAIN && !sessionStoreId
          ? messages["page.chainsHelp"]
          : messages["page.storeHelp"]}
      </PageHeader>
      <LayoutContent>
        <HelpStyles>
          <Row className="mb-30">
            <Col {...span10AndOffset2}>
              <Title level={4}>{messages["page.help.header"]}</Title>
            </Col>
            <Col {...span10AndOffset2}>
              <Row className="align-items-center">
                <h3>{messages["page.help.download"]}</h3>
                <i
                  onClick={fileExist ? onDownloadPdf : null}
                  className={classnames("ion-android-download", "icon", {
                    "icon-active": !isEmpty(fileExist),
                    "icon-disabled": isEmpty(fileExist),
                  })}
                />
              </Row>
              <Row>
                {!isEmpty(fileExist) && (
                  <div className="ml-20">
                    <Text code>{fileExist.manualName}</Text>
                  </div>
                )}
              </Row>
            </Col>
          </Row>

          <Row gutter={[0, 15]}>
            <Col {...span10AndOffset2}>
              <Title level={4}>{messages["page.help.Information"]}</Title>
            </Col>
          </Row>

          {role === ROLES.CHAIN && !sessionStoreId ? (
            <Row>
              <Col {...span20AndOffset2}>
                <Table
                  columns={columns(messages, listStore)}
                  rowKey={"store_id"}
                  dataSource={listStore}
                  bordered={true}
                  scroll={{ x: "max-content" }}
                  pagination={false}
                  loading={loading}
                />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col {...colForm}>
                <Formik
                  onSubmit={false}
                  initialValues={storeDetail}
                  enableReinitialize={true}
                  render={() => (
                    <Form colon={false} labelAlign="left">
                      <Form.Item
                        {...formItemLayout}
                        label={messages["page.help.contactName"]}
                        name="manager_name"
                      >
                        {loading ? (
                          <Skeleton.Input active={loading} />
                        ) : (
                          <Input
                            disabled
                            name="manager_name"
                            autoComplete={"new-showing"}
                          />
                        )}
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label={messages["page.Chain.Phone"]}
                        name="manager_phone"
                      >
                        {loading ? (
                          <Skeleton.Input active />
                        ) : (
                          <Input
                            disabled
                            name="manager_phone"
                            autoComplete={"new-showing"}
                          />
                        )}
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label={messages["page.Account.emailAddress"]}
                        name="manager_mail"
                      >
                        {loading ? (
                          <Skeleton.Input active />
                        ) : (
                          <Input
                            disabled
                            name="manager_mail"
                            autoComplete={"new-showing"}
                          />
                        )}
                      </Form.Item>
                    </Form>
                  )}
                />
              </Col>
            </Row>
          )}
        </HelpStyles>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const span10AndOffset2 = {
  sm: { span: 10, offset: 2 },
  xs: { span: 24 },
  md: { span: 24 },
};

const span20AndOffset2 = {
  sm: { span: 20, offset: 2 },
  xs: { span: 24 },
};

const colForm = {
  sm: { span: 16 },
  xs: { span: 24 },
};

const formItemLayout = {
  labelCol: {
    lg: { span: 6, offset: 3 },
    md: { span: 10, offset: 2 },
    sm: { span: 14 },
    xs: { span: 24 },
  },
  wrapperCol: {
    lg: { span: 10 },
    md: { span: 10 },
    sm: { span: 10 },
    xs: { span: 24 },
  },
};

const initialValues = {
  manager_name: "",
  manager_phone: "",
  manager_mail: "",
};

export default ChainHelp;
