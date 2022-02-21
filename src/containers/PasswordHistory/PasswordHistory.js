import React, { useState, useEffect, memo } from "react";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { Form, Select } from "formik-antd";
import { Row, Button, Col, Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import passwordHistoryActions from "@iso/redux/passwordHistory/actions";
import paginationConfig from "@iso/config/pagination.config";
import { TIME_JAPAN_FORMAT } from "@iso/constants/common.constant";

import PasswordHistoryStyles from "./PasswordHistory.styles";

const PasswordHistory = () => {
  const [prevSearch, setPrevSearch] = useState(initialValues);
  const [currentPage, setCurrentPage] = useState(paginationConfig.current);
  const [data, setData] = useState([]);
  const { messages } = useIntl();
  const {
    PasswordHistory: {
      passwordHistories,
      total,
      loading,
      OTAs,
      updaters,
      show,
      loadingMetaData,
    },
    StoreAddEdit: {
      store: { storeId },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setData([]);
    setCurrentPage(1);
    if (show) {
      dispatch(
        passwordHistoryActions.getPasswordHistories({
          storeId,
          size: paginationConfig.passwordHistoriesSize,
          page: paginationConfig.current,
        })
      );
      dispatch(passwordHistoryActions.getMetaData({ storeId }));
    }
  }, [dispatch, storeId, show]);

  useEffect(() => {
    setData((data) => [...data, ...passwordHistories]);
  }, [passwordHistories]);

  const handleSearch = (data) => {
    setData([]);
    setCurrentPage(1);
    setPrevSearch({
      otaId: data.otaId,
      directorId: data.directorId,
    });
    dispatch(
      passwordHistoryActions.getPasswordHistories({
        storeId,
        otaId: data.otaId,
        accountId: data.directorId,
        size: paginationConfig.passwordHistoriesSize,
        page: paginationConfig.current,
      })
    );
  };

  const handleSeeMore = () => {
    if (currentPage * paginationConfig.passwordHistoriesSize <= total) {
      setCurrentPage(currentPage + 1);
      dispatch(
        passwordHistoryActions.getPasswordHistories({
          storeId,
          size: paginationConfig.passwordHistoriesSize,
          otaId: prevSearch.otaId,
          accountId: prevSearch.directorId,
          page: currentPage + 1,
        })
      );
    }
  };

  return (
    <Modal
      title={messages["sidebar.passwordHistory"]}
      visible={show}
      width={750}
      style={{ top: 20 }}
      centered
      bodyStyle={bodyModalStyle}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() => dispatch(passwordHistoryActions.togglePasswordHistory())}
    >
      {show && (
        <PasswordHistoryStyles>
          <Formik
            enableReinitialize
            onSubmit={handleSearch}
            initialValues={initialValues}
          >
            {({ values }) => (
              <Form colon={false} className="mb-3">
                <Row justify="center">
                  <Col xs={24} md={20}>
                    <Row>
                      <Col xs={24} md={13}>
                        <Form.Item
                          label={messages["page.passwordHistory.ota"]}
                          labelAlign="left"
                          gutter={[0, { md: 28 }]}
                          name="otaId"
                          labelCol={{ sm: 24, md: 15 }}
                          wrapperCol={{ md: 9 }}
                        >
                          <Select
                            value={values.otaId}
                            name="otaId"
                            loading={loadingMetaData}
                          >
                            <Select.Option value={null}>
                              {messages["input.select.all"]}
                            </Select.Option>
                            {OTAs.map((ota, idx) => (
                              <Select.Option key={idx} value={ota.otaId}>
                                {ota.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={{ offset: 2, span: 9 }}>
                        <Form.Item
                          label={messages["page.passwordHistory.accountName"]}
                          labelAlign="left"
                          gutter={[0, { md: 28 }]}
                          name="directorId"
                          labelCol={{ sm: 24, md: 7 }}
                          wrapperCol={{ md: 15 }}
                        >
                          <Select
                            value={values.directorId}
                            name="directorId"
                            loading={loadingMetaData}
                          >
                            <Select.Option value={null}>
                              {messages["input.select.all"]}
                            </Select.Option>
                            {updaters.map((updater, idx) => (
                              <Select.Option
                                name="directorId"
                                key={idx}
                                value={updater.accountId}
                              >
                                {updater.displayName}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} md={3}>
                    <Row justify="end" className="xs-pb-2">
                      <Button htmlType="submit" type="primary" block>
                        {messages["page.Account.buttonSearch"]}
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          <Row justify="center">
            <Col xs={24}>
              <Table
                bordered
                rowKey="updatedTime"
                loading={loading}
                dataSource={data}
                columns={generateColumns(messages)}
                pagination={false}
                scroll={{ x: "max-content" }}
              />
            </Col>
            <Col span={24} className="see-more">
              <div
                className={
                  currentPage * paginationConfig.passwordHistoriesSize >= total
                    ? "not-allowed"
                    : "pointer"
                }
                onClick={() => handleSeeMore()}
              >
                {messages["page.passwordHistory.seeMore"]}
              </div>
            </Col>
          </Row>
        </PasswordHistoryStyles>
      )}
    </Modal>
  );
};

const generateColumns = (messages) => {
  return [
    {
      title: messages["page.passwordHistory.updateTime"],
      dataIndex: "updatedTime",
      key: "updatedTime",
      align: "center",
      render: (milliseconds) => <span>{convertTime(milliseconds)}</span>,
    },
    {
      title: messages["page.passwordHistory.ota"],
      dataIndex: "otaName",
      key: "otaName",
      align: "center",
    },
    {
      title: messages["page.passwordHistory.password"],
      dataIndex: "password",
      key: "password",
      align: "center",
    },
    {
      title: messages["page.passwordHistory.accountName"],
      dataIndex: "accountName",
      key: "accountName",
      align: "center",
    },
  ];
};

const initialValues = {
  otaId: null,
  directorId: null,
};

const bodyModalStyle = {
  overflowY: "scroll",
  height: "calc(100vh - 25em)",
  width: "auto",
};

const convertTime = (milliseconds) =>
  `${moment(milliseconds).format(TIME_JAPAN_FORMAT)}`;

export default memo(PasswordHistory);
