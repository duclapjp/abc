import styled from "styled-components";

const DefaultPlansStyles = styled.div`
  .ant-btn {
    min-width: 100px;
  }

  @media only screen and (min-width: 992px) {
    .button {
      width: 130px;
    }
  }

  @media only screen and (min-width: 1200px) {
    .button {
      width: 150px;
    }
  }

  @media only screen and (min-width: 1600px) {
    .button {
      width: 200px;
    }
  }
`;

export { DefaultPlansStyles };
