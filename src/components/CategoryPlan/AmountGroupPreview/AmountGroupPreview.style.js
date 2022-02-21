import styled from "styled-components";
import { Modal } from "antd";

const ModalPreview = styled(Modal)`
  max-width: 1200px;

  .ant-modal-footer {
    .ant-btn-primary {
      display: none;
    }
  }

  .ant-table-title {
    font-weight: bold;
  }
  .m-0 {
    margin: 0;
  }
  .text-center {
    text-align: center;
  }
`;

export default ModalPreview;
