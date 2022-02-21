import styled from "styled-components";

export const StoreOtaListWrapper = styled.div`
  margin-bottom: 20px;

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

  .url-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    .hyper-link {
      margin-left: 10px;
      cursor: pointer;

      &:hover {
        color: #1890ff;
      }
    }
  }
`;
