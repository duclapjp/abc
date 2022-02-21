import styled from "styled-components";

const OTAAddAndEditStyles = styled.div`
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

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .sub-url {
    justify-content: center;

    input {
      text-align: center;
    }
  }

  .w-100 {
    width: 100%;
  }

  .mb-24 {
    margin-bottom: 24px;
  }

  .justify-content-center {
    justify-content: center;
  }

  @media only screen and (max-width: 992px) {
    .justify-content-end {
      justify-content: flex-end;
    }
  }
`;

export { OTAAddAndEditStyles };
