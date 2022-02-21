import styled from "styled-components";

const PlanAmountDefaultSettingStyles = styled.div`
  .ant-tabs {
    .ant-tabs-nav {
      .ant-tabs-nav-wrap {
        .ant-tabs-nav-list {
          .ant-tabs-tab {
            background-color: #d9d9d9;

            &:hover {
              color: black;
            }

            &.ant-tabs-tab-active {
              background: #a4c2f4;
              color: #0d0f12;
            }
          }
        }
      }
    }
  }

  tr.drop-over-downward td {
    border-bottom: 2px dashed #1890ff;
  }

  tr.drop-over-upward td {
    border-top: 2px dashed #1890ff;
  }

  .border-none {
    border: none;
  }

  .text-center {
    text-align: center;
  }

  .mt-15 {
    margin-top: 15px;
  }

  .mb-15 {
    margin-bottom: 15px;
  }

  .ant-divider-inner-text {
    font-weight: 600;
  }
`;

export { PlanAmountDefaultSettingStyles };
