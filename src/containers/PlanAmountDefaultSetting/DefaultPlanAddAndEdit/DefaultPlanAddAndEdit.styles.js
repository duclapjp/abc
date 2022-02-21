import styled from "styled-components";

const DefaultPlanAddAndEditStyles = styled.div`
  .ant-form-item-required::after {
    display: inline-block !important;
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

  .group-button {
    margin-top: 30px;

    button {
      min-width: 100px;
    }
  }
`;

export { DefaultPlanAddAndEditStyles };
