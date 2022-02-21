// eslint-disable-next-line no-unused-vars
import React from "react";
import { gantt } from "dhtmlx-gantt";
import moment from "moment";
import { ONE_DAY_MILISECOND } from "@iso/constants/common.constant";

const getClassForCell = (date) => {
  const today = moment().startOf("day").format("x");
  const dateMoment = moment(date).startOf("day");
  if (dateMoment.startOf("day").format("x") === today) {
    return "cell-today";
  }

  // if (!gantt.isWorkTime(date)) {
  //   return "week-end";
  // }
  if (["6", "0"].includes(dateMoment.format("d"))) {
    return "week-end";
  }

  return "scales-cell-day";
};

const taskcell = () => {
  return (item, date) => getClassForCell(date);
};

const datScaleCell = () => {
  return (date) => getClassForCell(date);
};

export const buildConfigGantt = (start_date, dashboardRoute) => {
  gantt.config.xml_date = "%Y-%m-%d %H:%i";
  gantt.config.readonly = true;
  gantt.config.work_time = false;

  gantt.templates.timeline_cell_class = taskcell();

  gantt.config.scale_height = 60;
  gantt.config.min_column_width = 20;

  gantt.config.min_duration = ONE_DAY_MILISECOND;
  gantt.config.start_date = new Date(start_date);

  const end = new Date(start_date);
  end.setDate(end.getDate() + 60);
  gantt.config.end_date = end;

  gantt.config.fit_tasks = true;
  gantt.config.initial_scroll = false;
  gantt.config.autosize = "y";
  gantt.config.scales = [
    { unit: "month", step: 1, format: "%Y/%m" },
    {
      unit: "day",
      step: 1,
      format: "%j",
      css: datScaleCell(),
    },
  ];
  gantt.config.columns = [
    {
      name: "id",
      label: "作業番号",
      tree: true,
      width: "150",
      template: (obj) => {
        if (obj.status === "user") {
          return obj.id;
        }

        return `<a href="${dashboardRoute}/tasks/edit/${obj.id}">${obj.id}</a>`;
      },
    },
    // { name: "title", label: "Task name", width: "*" },
    { name: "assigneeName", label: "作業者", align: "left" },
  ];
};
