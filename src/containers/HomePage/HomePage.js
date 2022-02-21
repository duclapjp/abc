import React, { useState, useEffect, useCallback } from "react";
import { Typography, Table, Card, Row, Col, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import classNames from "classnames";
import { isEmpty, map } from "lodash";
import { Link } from "react-router-dom";

import { ROLES } from "@iso/constants/common.constant";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";
import dashboardActions from "@iso/redux/dashboard/actions";
import paginationConfig from "@iso/config/pagination.config";

import HomePageStyles from "./HomePage.styles";
import { generateColumns } from "./generateColumns";
import { Helmet } from "react-helmet";

const HomeScreen = () => {
  const {
    user: { role },
    dashboardRoute,
  } = useSelector((state) => state.Auth);
  const [currentPage, setCurrentPage] = useState({
    stopWatches: 1,
    uncompletedTasks: 1,
  });
  const {
    loadingStopWatches,
    stopWatches,
    stopWatchesTotal,
    loadingUncompletedTasks,
    uncompletedTasks,
    uncompletedTasksTotal,
    categories,
    loadingCategories,
  } = useSelector((state) => state.Dashboard);

  const { messages } = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === ROLES.STORE) {
      dispatch(dashboardActions.getCategories());
    } else {
      dispatch(
        dashboardActions.getStopWatches({
          page: currentPage.stopWatches,
        })
      );
    }
    dispatch(
      dashboardActions.getUncompletedTasks({
        page: currentPage.uncompletedTasks,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, role]);

  const onChangePage = useCallback(
    (pagination, key, action) => {
      setCurrentPage((prevState) => ({
        ...prevState,
        [key]: pagination.current,
      }));
      dispatch(action(pagination.current));
    },
    [dispatch]
  );

  const onExpandTable = (expanded, { taskId }) => {
    if (expanded) {
      dispatch(dashboardActions.getChildrenTask({ taskId }));
    }
  };

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["forms.progressBar.dashboardTitle"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["forms.progressBar.dashboardTitle"]}</PageHeader>
      <LayoutContent>
        <HomePageStyles>
          {[ROLES.CHAIN, ROLES.STORE].includes(role) && (
            <div className="mb-40">
              <Row justify="center">
                <Col xs={24} lg={20} xl={18} xxl={14}>
                  <Card
                    title={messages["page.dashboard.title.requestTask"]}
                    loading={loadingCategories}
                  >
                    <Space size={10}>
                      {map(categories, (category, index) => (
                        <Button key={index} type="primary">
                          <Link
                            to={{
                              pathname: `${dashboardRoute}/tasks/new`,
                              state: { planId: category.planId },
                            }}
                          >
                            {category.name}
                          </Link>
                        </Button>
                      ))}
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>
          )}
          {tables({
            stopWatches,
            stopWatchesTotal,
            loadingStopWatches,
            uncompletedTasks,
            uncompletedTasksTotal,
            loadingUncompletedTasks,
          }).map(({ key, loading, dataSource, total, roleRender, action }, idx) => {
            return (
              roleRender.includes(role) &&
              ((key === "stopWatches" && !isEmpty(dataSource)) ||
                key === "uncompletedTasks") && (
                <div key={idx} className={classNames({ "mb-40": total === 0 })}>
                  <Typography.Title level={4}>
                    {messages[`page.dashboard.title.${key}`]}
                  </Typography.Title>
                  <Table
                    bordered
                    loading={loading}
                    rowKey={(row, idx) => idx}
                    scroll={{ x: "max-content" }}
                    dataSource={dataSource}
                    columns={generateColumns(messages, key, role, dashboardRoute)}
                    expandable={{
                      indentSize: 30,
                      onExpand: onExpandTable,
                    }}
                    pagination={{
                      ...paginationConfig,
                      current: currentPage[key],
                      responsive: true,
                      pageSize: paginationConfig.pageSize,
                      total,
                    }}
                    onChange={(pagination) => onChangePage(pagination, key, action)}
                  />
                </div>
              )
            );
          })}
        </HomePageStyles>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const tables = ({
  stopWatches,
  stopWatchesTotal,
  loadingStopWatches,
  uncompletedTasks,
  uncompletedTasksTotal,
  loadingUncompletedTasks,
}) => [
  {
    key: "stopWatches",
    dataSource: stopWatches,
    total: stopWatchesTotal,
    loading: loadingStopWatches,
    roleRender: [ROLES.ADMIN, ROLES.USER, ROLES.SUBADMIN],
    action: (page) => dashboardActions.getStopWatches({ page }),
  },
  {
    key: "uncompletedTasks",
    dataSource: uncompletedTasks,
    total: uncompletedTasksTotal,
    loading: loadingUncompletedTasks,
    roleRender: [ROLES.ADMIN, ROLES.CHAIN, ROLES.STORE, ROLES.USER, ROLES.SUBADMIN],
    action: (page) => dashboardActions.getUncompletedTasks({ page }),
  },
];

export default HomeScreen;
