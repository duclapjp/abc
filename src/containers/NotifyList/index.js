import React, { useState, useCallback, useEffect } from "react";
import { Row, Col, Table, Select } from "antd";
import { useIntl } from "react-intl";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { NOTIFY, ROLES, DATE_TIME_FORMAT } from "@iso/constants/common.constant";
import notifyAction from "@iso/redux/notify/actions";
import paginationConfig from "@iso/config/pagination.config";
import { SELECT_TASK_STATUS_LIST } from "@iso/constants/select.constant";

import { SelectWrapper, ModalWrapper } from "./notify.styles";
import TitleNotify from "./TitleNotify";

const NotifyList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const {
    Auth: {
      dashboardRoute,
      user: { role },
    },
    Notify: { notifications, showModal, loading, total },
  } = useSelector((state) => state);

  const handleChangePage = useCallback(
    (pagination) => {
      setCurrentPage(pagination.current);
      dispatch(
        notifyAction.getNotify({
          size: paginationConfig.pageSize,
          page: pagination.current,
        })
      );
    },
    [dispatch]
  );

  const handleUpdateStatus = useCallback(
    (status, taskId) => {
      dispatch(
        notifyAction.updateStatus({
          size: paginationConfig.pageSize,
          page: currentPage,
          status,
          taskId,
        })
      );
    },
    [dispatch, currentPage]
  );

  const handleCancel = useCallback(() => dispatch(notifyAction.toggleModal()), [
    dispatch,
  ]);

  useEffect(() => {
    dispatch(notifyAction.getNotify({ page: 1 }));
  }, [dispatch]);

  return (
    <ModalWrapper
      title={messages["Page.X.NotifyList"]}
      visible={showModal}
      onCancel={handleCancel}
      bodyStyle={bodyModalStyle}
      width="calc(100vw - 100px)"
      centered
    >
      <Row justify="center">
        <Col xs={24}>
          <Table
            columns={columns({
              messages,
              dispatch,
              role,
              dashboardRoute,
              handleUpdateStatus,
            })}
            rowKey="notificationId"
            dataSource={notifications}
            bordered
            loading={loading}
            scroll={{ x: "max-content" }}
            pagination={{ ...paginationConfig, current: currentPage, total }}
            onChange={handleChangePage}
            title={() => messages["Page.X.NotifyList"]}
          />
        </Col>
      </Row>
    </ModalWrapper>
  );
};

const renderTitle = ({ title, actionId, role, dashboardRoute }) => {
  let linkTo;

  if (title !== NOTIFY.CHANGE_OTA) {
    linkTo = `${dashboardRoute}/tasks/edit/${actionId}`;
  } else if (role === ROLES.STORE) {
    linkTo = `${dashboardRoute}/store-setting`;
  } else {
    linkTo = `${dashboardRoute}/stores/edit/${actionId}`;
  }

  return linkTo;
};

const columns = ({ messages, role, dashboardRoute, handleUpdateStatus }) => {
  return [
    {
      title: messages["page.NotifyList.DateTime"],
      dataIndex: "createdDate",
      align: "center",
      render: (createdDate) => moment(createdDate).format(DATE_TIME_FORMAT),
    },
    {
      title: messages["page.NotifyList.Title"],
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (title, { actionId }) => {
        const linkTo = renderTitle({ title, actionId, role, dashboardRoute });
        return <TitleNotify title={title} linkTo={linkTo} actionId={actionId} />;
      },
    },
    {
      title: messages["page.Account.status"],
      dataIndex: "actionValue",
      key: "actionValue",
      align: "center",
      width: 200,
      render: (value, { actionId }) =>
        value && (
          <SelectWrapper
            value={value}
            onChange={(val) => handleUpdateStatus(val, actionId)}
          >
            {_.map(SELECT_TASK_STATUS_LIST.OPTIONS, (option, idx) => (
              <Select.Option key={idx} value={option}>
                {option}
              </Select.Option>
            ))}
          </SelectWrapper>
        ),
    },
    ...(role !== ROLES.STORE
      ? [
          {
            title: messages["page.NotifyList.AccountName"],
            dataIndex: "creatorName",
            key: "creatorName",
            align: "center",
          },
        ]
      : []),
  ];
};

const bodyModalStyle = {
  overflowY: "scroll",
  height: "calc(100vh - 25em)",
  // width: "auto",
};

export default NotifyList;
