import React from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

export const tableColumnData = (messages, location, dashboardRoute) => {
  const { startDate, endDate } = location;
  const paramStartDate = !isEmpty(startDate) ? `startDate=${startDate}` : "";
  const paramEndDate = !isEmpty(endDate) ? `&endDate=${endDate}` : "";

  return [
    {
      title: messages["page.taskLog.listUser"],
      dataIndex: "displayName",
      align: "center",
    },
    {
      title: messages["page.taskLog.timeWork"],
      dataIndex: "totalExecuteTime",
      align: "center",
      render: (millisecond) => <span>{convertMillisecond(millisecond)}</span>,
    },
    {
      title: messages["page.taskLog.number"],
      dataIndex: "number",
      align: "center",
      render: (value, data) => (
        <Link
          to={`${dashboardRoute}/tasklogs/tasks?${paramStartDate}${paramEndDate}&accountId=${data.accountId}`}
        >
          {value}
        </Link>
      ),
    },
  ];
};

const convertMillisecond = (milliseconds) => {
  let min = Math.floor(milliseconds / (1000 * 60));
  min = min % (1000 * 60);
  return `${min}`;
};
