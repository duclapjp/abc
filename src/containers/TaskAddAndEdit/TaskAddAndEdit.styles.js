import styled from "styled-components";

const LayoutEditTaskWrapper = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 20px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .alignEnd {
    display: flex;
    justify-content: flex-end;
  }

  .height-40vh {
    height: 40vh;
  }

  .ant-form-item-required::after {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: "*" !important;
  }

  .ant-form-item-required::before {
    margin-right: 0 !important;
    content: "" !important;
  }

  .ant-input-number {
    width: 100%;

    .ant-input-number-input-wrap {
      width: calc(100% - 22px);
    }
  }

  .btnSelectStore {
    width: 132px;
    margin-right: 10px;
  }

  .ant-form-item-has-error {
    .btnSelectStore {
      border-color: red;
    }
  }
`;

export { LayoutEditTaskWrapper };
