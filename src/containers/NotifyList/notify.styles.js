import styled from "styled-components";
import { Select, Modal } from "antd";

export const SelectWrapper = styled(Select)`
  width: 100%;
`;

export const ModalWrapper = styled(Modal)`
  max-width: 768px;

  .ant-modal-footer {
    .ant-btn-primary {
      display: none;
    }
  }

  .ant-table-title {
    font-weight: bold;
  }
`;
