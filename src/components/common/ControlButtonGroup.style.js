import styled from "styled-components";

export const ControlButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  width: 100%;

  .ant-btn + .ant-btn {
    margin-left: 8px;
  }
`;
