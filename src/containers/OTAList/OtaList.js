import React, { useState, useEffect, useCallback } from "react";
import { Table, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { useRouteMatch, useHistory, Link } from "react-router-dom";

import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";
import otaActions from "@iso/redux/ota/actions";
import paginationConfig from "@iso/config/pagination.config";
import { OTA_STATUS } from "@iso/constants/common.constant";

import { OtaListStyles } from "./OtaList.styles";
import { Helmet } from "react-helmet";

const OtaList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { otas, total, requesting } = useSelector((state) => state.OTA);
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      otaActions.getOTAs({ page: currentPage, size: paginationConfig.pageSize })
    );
  }, [dispatch, currentPage]);

  const onUpdateStatus = useCallback(
    ({ otaId, status }) => {
      dispatch(
        otaActions.updateOTAStatus({
          otaId,
          status: toggleStatus[status],
          page: currentPage,
          size: paginationConfig.pageSize,
        })
      );
    },
    [dispatch, currentPage]
  );

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["page.otaList.title"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["page.otaList.title"]}</PageHeader>
      <LayoutContent>
        <OtaListStyles>
          <div className="top">
            <Button type="primary" onClick={() => history.push(`${url}/new`)}>
              {messages["page.Account.buttonAdd"]}
            </Button>
          </div>
          <div>
            <Table
              bordered
              rowClassName={({ status }) =>
                status === OTA_STATUS.DISABLED && "row-disabled"
              }
              rowKey={(_, idx) => idx}
              onChange={(pagination) => setCurrentPage(pagination.current)}
              dataSource={otas}
              loading={requesting}
              pagination={{
                ...paginationConfig,
                current: currentPage,
                total,
              }}
              columns={generateColumns({
                messages,
                onUpdateStatus,
                url,
              })}
              scroll={{ x: "max-content" }}
            />
          </div>
        </OtaListStyles>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const generateColumns = ({ messages, onUpdateStatus, url }) => [
  {
    title: "ID",
    dataIndex: "otaId",
    key: "otaId",
    align: "center",
    render: (otaId) => <Link to={`${url}/edit/${otaId}`}>{otaId}</Link>,
  },
  {
    title: messages["page.otaList.th.type"],
    dataIndex: "otaTypeName",
    key: "otaTypeName",
    align: "center",
  },
  {
    title: messages["page.otaList.th.serviceName"],
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: messages["page.otaList.th.deadline"],
    dataIndex: "passwordUpdateDeadline",
    key: "passwordUpdateDeadline",
    align: "center",
  },
  {
    title: messages["page.taskList.taskLog.operation"],
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status, { otaId }) => {
      return (
        <Button onClick={() => onUpdateStatus({ otaId, status })}>
          {messages[`page.otaList.button.${toggleStatus[status]}`]}
        </Button>
      );
    },
  },
];

const toggleStatus = {
  ENABLED: OTA_STATUS.DISABLED,
  DISABLED: OTA_STATUS.ENABLED,
};

export default OtaList;
