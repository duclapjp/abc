import styled from "styled-components";

const GanttStyle = styled.div`
  width: 100%;
  height: 100vh;

  .cell-today {
    background-color: #f4dfc7;
    border-bottom: 1px solid #cecece;
  }

  .week-end {
    background-color: #e5e5e5;
    border-bottom: 1px solid #cecece;
  }

  .gantt_add,
  .gantt_grid_head_add {
    display: none !important;
  }
  .gantt_scale_cell,
  .gantt_task_content {
    color: #000000 !important;
  }

  .gantt_task_content {
    overflow: inherit;
  }
  .gantt_task_line.gantt_task_inline_color {
    border-color: transparent;
  }
`;

export default GanttStyle;
