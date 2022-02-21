import React from "react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

import {
  ROLES,
  TIME_JAPAN_FORMAT,
  TIMEZONE_JAPAN,
} from "@iso/constants/common.constant";

import RemainingDay from "./RemainingDay";

const parseDate = (ms, type) => {
  if (!ms) {
    return "-";
  } else {
    return type === "date"
      ? moment(ms).tz(TIMEZONE_JAPAN).format(TIME_JAPAN_FORMAT.split(",")[0])
      : moment(ms).tz(TIMEZONE_JAPAN).format(TIME_JAPAN_FORMAT);
  }
};

export const generateColumns = (messages, type, role, dashboardRoute) => {
  const typeTask = type === "uncompletedTasks";
  const typeStopWatch = type === "stopWatches";
  const typeStopWatchIsA = type === "stopWatches" && role === ROLES.ADMIN;
  const typeTaskIsAU =
    type === "uncompletedTasks" && [ROLES.ADMIN, ROLES.USER].includes(role);
  const typeTaskIsC = type === "uncompletedTasks" && role === ROLES.CHAIN;

  const isCS = role === ROLES.CHAIN || role === ROLES.STORE;

  return [
    ...(typeTask
      ? [
          {
            title: "ID",
            dataIndex: "index",
            key: "index",
            align: "center",
            width: 130,
            // eslint-disable-next-line react/display-name
            render: (_, { taskId }) => (
              <Link to={`${dashboardRoute}/tasks/edit/${taskId}`}>{taskId}</Link>
            ),
          },
        ]
      : []),
    ...(typeStopWatch
      ? [
          {
            title: messages["page.dashboard.th.startDate"],
            dataIndex: "start_date",
            key: "start_date",
            align: "center",
            render: (ms) => parseDate(ms),
          },
        ]
      : []),
    ...(typeTask
      ? [
          {
            title: messages[`page.tasks.${isCS ? "deliveryDate" : "dueDate"}`],
            dataIndex: "dueDate",
            key: "dueDate",
            align: "center",
            render: (ms) => parseDate(ms, "date"),
          },
        ]
      : []),
    ...(typeTaskIsAU
      ? [
          {
            title: messages["page.dashboard.th.remainingDays"],
            dataIndex: "dayRemain",
            key: "dayRemain",
            align: "center",
            render: (day) => {
              const bg =
                day < 0
                  ? "#db3b27"
                  : day === 0
                  ? "#efbb3f"
                  : day > 0
                  ? "#81d552"
                  : "unset";
              return {
                children: <RemainingDay day={day} />,
                props: {
                  style: {
                    backgroundColor: bg,
                  },
                },
              };
            },
          },
        ]
      : []),
    ...(typeTaskIsC
      ? [
          {
            title: messages["page.storeAddEditEmail.storeName"],
            dataIndex: "storeName",
            key: "storeName",
            align: "center",
          },
        ]
      : []),
    {
      title: messages["page.dashboard.th.taskName"],
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    ...(typeTask && role !== ROLES.STORE
      ? [
          {
            title: messages["page.NotifyList.status"],
            dataIndex: "status",
            key: "status",
            align: "center",
          },
          {
            title: messages["page.taskAddEdit.assignee"],
            dataIndex: "assigneeName",
            key: "assigneeName",
            align: "center",
          },
        ]
      : []),
    ...(typeStopWatchIsA
      ? [
          {
            title: messages["page.taskAddEdit.assignee"],
            dataIndex: "display_name",
            key: "display_name",
            align: "center",
          },
        ]
      : []),
    ...(typeStopWatch
      ? [
          {
            title: messages[`page.tasks.${isCS ? "deliveryDate" : "dueDate"}`],
            dataIndex: "due_date",
            key: "due_date",
            align: "center",
            render: (ms) => parseDate(ms, "date"),
          },
        ]
      : []),
  ];
};
