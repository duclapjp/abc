import styled from "styled-components";
import LayoutContent from "@iso/components/utility/layoutContent";

const LayoutGanttChartContentStyle = styled(LayoutContent)`
  .tag-task-status {
    text-align: left;

    .ant-tag {
      color: #000000;
      margin-right: 8px;
      margin-left: 0px;
      margin-bottom: 8px;
    }
  }
  .filter-label {
    margin-right: 10px;
    display: flex;
    align-items: center;
    width: 80px;
  }

  .filter-content {
    margin-bottom: 20px;

    .ant-divider {
      border-color: #d9d9d9;
      height: 24px;
      margin: auto 0px;
    }
    .ant-btn {
      border-width: 2px;
      margin-left: 15px;
      margin-right: 15px;
      color: #2d9a7a;

      &:hover {
        border-color: #2d9a7a;
      }
    }

    .ant-picker,
    .ant-select {
      width: 150px;
    }
  }
`;

export default LayoutGanttChartContentStyle;
