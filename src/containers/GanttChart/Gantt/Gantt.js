import React, { useRef, useEffect, memo } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { buildConfigGantt } from "./config";
import GanttStyle from "./gantt.style";
import {
  GANTT_CHART_DATE_FORMAT,
  ONE_DAY_MILISECOND,
} from "@iso/constants/common.constant";
import { TASK_STATUS_MAPPING_COLOR } from "@iso/constants/select.constant";
import { useSelector } from "react-redux";
import { floor, groupBy } from "lodash";

const enhance = (tasks) => {
  let enhanceTasks = [];
  const dataGroups = groupBy(tasks, "assigneeId");
  for (let key in dataGroups) {
    const data = dataGroups[key];
    const assigneeId = key;
    let assigneeName = key;
    let startDate = null;
    let dueDate = null;
    const userTaskId =
      assigneeId && assigneeId !== "null" ? `User_${assigneeId}` : `担当者未設定`;
    const tasklist = data.map((item) => {
      assigneeName = item.assigneeName;
      if (!startDate || startDate > item.startDate) {
        startDate = item.startDate;
      }
      if (!dueDate || dueDate < item.dueDate) {
        dueDate = item.dueDate;
      }

      return {
        ...item,
        parent: item.parent ? item.parent : userTaskId,
      };
    });

    enhanceTasks = [
      ...enhanceTasks,
      {
        id: userTaskId,
        assigneeName: assigneeName,
        startDate,
        dueDate,
        status: "user",
        borderColor: "transparent",
        title: "",
      },
      ...tasklist,
    ];
  }

  return enhanceTasks;
};

const Gantt = ({ tasks, startDate }) => {
  const ganttContainer = useRef();
  const dashboardRoute = useSelector((state) => state.Auth.dashboardRoute);

  useEffect(() => {
    if (ganttContainer?.current) {
      buildConfigGantt(startDate, dashboardRoute);
    }
  }, [startDate, dashboardRoute]);

  useEffect(() => {
    if (ganttContainer?.current) {
      const enhanceData = enhance(tasks);
      const dataChart = {
        data: enhanceData.map((item) => ({
          ...item,
          color: TASK_STATUS_MAPPING_COLOR[item.status],
          duration:
            !item.startDate || !item.dueDate
              ? 1
              : floor((item.dueDate - item.startDate) / ONE_DAY_MILISECOND + 1),
          start_date: item.startDate
            ? moment(item.startDate).format(GANTT_CHART_DATE_FORMAT)
            : moment(item.dueDate).format(GANTT_CHART_DATE_FORMAT),
          text: item.title,
        })),
      };
      gantt.clearAll();
      gantt.init(ganttContainer.current);
      gantt.parse(dataChart);
    }

    return () => {
      gantt.clearAll();
    };
  }, [tasks]);

  return <GanttStyle ref={ganttContainer} />;
};

Gantt.propTypes = {
  tasks: PropTypes.array,
  startDate: PropTypes.object,
};

export default memo(Gantt);
