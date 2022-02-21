import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import PageHeader from "@iso/components/utility/pageHeader";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import { Row, Col, Table } from "antd";
import taskActions from "@iso/redux/task/actions";

const TaskLogItem = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const { tasklogTasks, loading } = useSelector((state) => state.Task);
  const dashboardRoute = useSelector((state) => state.Auth.dashboardRoute);

  useEffect(() => {
    dispatch(taskActions.getTasklogTasks({ params: location.search }));
  }, [dispatch, location]);

  return (
    <LayoutWrapper>
      <PageHeader>{messages["sidebar.tasks"]}</PageHeader>
      <LayoutContent>
        <Row justify="center">
          <Col span={24}>
            <Table
              bordered
              rowKey="taskId"
              columns={columns(messages, dashboardRoute)}
              dataSource={tasklogTasks}
              loading={loading}
              scroll={{ x: "max-content" }}
              pagination={false}
            />
          </Col>
        </Row>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const columns = (messages, dashboardRoute) => {
  return [
    {
      title: "No",
      dataIndex: "taskId",
      key: "taskId",
      align: "center",
      render: (id) => <Link to={`${dashboardRoute}/tasks/edit/${id}`}>{id}</Link>,
    },
    {
      title: messages["page.tasks.store"],
      dataIndex: "storeName",
      align: "center",
    },
    {
      title: messages["page.tasks.title"],
      dataIndex: "title",
      align: "center",
    },
    {
      title: messages["page.tasks.assignee"],
      dataIndex: "assigneeName",
      align: "center",
    },
    {
      title: messages["page.tasks.status"],
      dataIndex: "status",
      align: "center",
    },
    {
      title: messages["page.tasks.priority"],
      dataIndex: "priority",
      align: "center",
    },
    {
      title: messages["page.tasks.registerDate"],
      dataIndex: "registerDate",
      align: "center",
    },
    {
      title: messages["page.tasks.startDate"],
      dataIndex: "startDate",
      align: "center",
    },
    {
      title: messages["page.tasks.dueDate"],
      dataIndex: "dueDate",
      align: "center",
    },
    {
      title: messages["page.tasks.estTime"],
      dataIndex: "estTime",
      align: "center",
    },
    {
      title: messages["page.tasks.actualTime"],
      dataIndex: "actualTime",
      align: "center",
    },
    {
      title: messages["page.tasks.director"],
      dataIndex: "directorName",
      align: "center",
    },
    {
      title: messages["page.tasks.registerPerson"],
      dataIndex: "registerPersonName",
      align: "center",
    },
    {
      title: messages["page.tasks.timePoint"],
      dataIndex: "estPoint",
      align: "center",
    },
  ];
};

export default TaskLogItem;
