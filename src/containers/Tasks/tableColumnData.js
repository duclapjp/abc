import React from "react";
import { ROLES } from "@iso/constants/common.constant";
import { Link } from "react-router-dom";

export const tableColumnData = ({ messages, role, dashboardRoute }) => {
  const isAU = role === ROLES.ADMIN || ROLES.SUBADMIN || role === ROLES.USER;
  const isAUC = isAU || role === ROLES.CHAIN;
  const isCS = role === ROLES.CHAIN || role === ROLES.STORE;

  return [
    {
      title: "No",
      dataIndex: "taskId",
      key: "id",
      align: "center",
      render: (id) => <Link to={`${dashboardRoute}/tasks/edit/${id}`}>{id}</Link>,
    },
    ...(isAUC
      ? [
          {
            title: messages["page.tasks.store"],
            dataIndex: "storeName",
            key: "storeName",
            align: "center",
          },
        ]
      : []),
    {
      title: messages["page.tasks.title"],
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    ...(isAU
      ? [
          {
            title: messages["page.tasks.assignee"],
            dataIndex: "assigneeName",
            key: "assigneeName",
            align: "center",
          },
        ]
      : []),
    ...(role !== ROLES.STORE
      ? [
          {
            title: messages["page.tasks.status"],
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (status) => messages[`page.tasks.status.${status}`],
          },
        ]
      : []),
    ...(isAU
      ? [
          {
            title: messages["page.tasks.priority"],
            dataIndex: "priority",
            key: "priority",
            align: "center",
            render: (priority) => messages[`page.tasks.priority.${priority}`],
          },
        ]
      : []),
    {
      title: messages["page.tasks.registerDate"],
      dataIndex: "registerDate",
      key: "registerDate",
      align: "center",
    },
    ...(isAU
      ? [
          {
            title: messages["page.tasks.startDate"],
            dataIndex: "startDate",
            key: "startDate",
            align: "center",
          },
        ]
      : []),
    {
      title: messages[`page.tasks.${isCS ? "deliveryDate" : "dueDate"}`],
      dataIndex: "dueDate",
      key: "dueDate",
      align: "center",
    },
    ...(isAU
      ? [
          {
            title: messages["page.tasks.estTime"],
            dataIndex: "estTime",
            key: "estTime",
            align: "center",
          },
          {
            title: messages["page.tasks.actualTime"],
            dataIndex: "actualTime",
            key: "actualTime",
            align: "center",
          },
          {
            title: messages["page.tasks.director"],
            dataIndex: "directorName",
            key: "directorName",
            align: "center",
          },
        ]
      : []),
    ...(role !== ROLES.STORE
      ? [
          {
            title: messages["page.tasks.registerPerson"],
            dataIndex: "registerPersonName",
            key: "registerPersonName",
            align: "center",
          },
        ]
      : []),
    ...(isAU
      ? [
          {
            title: messages["page.tasks.timePoint"],
            dataIndex: "estPoint",
            key: "estPoint",
            align: "center",
          },
        ]
      : []),
  ];
};
