import styled from "styled-components";

const AmountGroupsStyles = styled.div`
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

  .mg-0 {
    margin: 0;
  }

  .mt-20 {
    margin-top: 20px;
  }
`;

export default AmountGroupsStyles;
