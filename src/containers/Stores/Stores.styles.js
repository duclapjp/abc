import styled from "styled-components";

const LayoutStoresWrapper = styled.div`
  .space-btn {
    width: 100%;
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

  .mb-5 {
    margin-bottom: 5em;
  }

  .d-block {
    display: block;
  }
`;
export { LayoutStoresWrapper };
