import styled from "styled-components";

const FileAttachGroupWrapper = styled.div`
  width: 100%;
  min-height: 100px;
  border: 1px solid #e9e9e9;
  padding: 10px;
  margin-bottom: 24px;

  .ant-upload-drag-icon {
    display: none;
  }

  .ant-upload-hint,
  .ant-upload-text {
    padding: 0 10px;
  }

  .ant-upload-list.ant-upload-list-picture-card {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
  }
`;

export { FileAttachGroupWrapper };
