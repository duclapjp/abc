import styled from "styled-components";

export default styled.div`
  @media only screen and (min-width: 767px) {
    .pl-12 {
      padding-left: 12px;
    }
    .mr-12 {
      margin-right: 12px;
    }
    .btn-group-form {
      text-align: right;
    }
  }
  @media only screen and (max-width: 766px) {
    .btn-group-form .ant-btn {
      width: 100%;
    }

    .btn-group-form .ant-btn + .ant-btn {
      margin-top: 12px;
    }
  }
`;
