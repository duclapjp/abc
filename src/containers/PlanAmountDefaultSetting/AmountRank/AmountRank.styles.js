import styled from "styled-components";

const AmountRankStyles = styled.div`
  .ant-table-content {
    .ant-form-item {
      margin-bottom: 0px;
    }
    .btn-action-group {
      .ant-btn {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }

  tr.drop-over-downward td {
    border-bottom: 2px dashed #1890ff;
  }

  tr.drop-over-upward td {
    border-top: 2px dashed #1890ff;
  }

  .ant-divider-horizontal.ant-divider-with-text {
    margin-bottom: 64px;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }
`;

export { AmountRankStyles };
