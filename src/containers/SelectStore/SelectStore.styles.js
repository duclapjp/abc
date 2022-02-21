import styled from "styled-components";
import withDirection from "@iso/lib/helpers/rtl";

const SelectStoreStyles = styled.div`
  .mt-24 {
    margin-top: 24px;
  }

  @media only screen and (min-width: 992px) {
    .mx-24 {
      margin-left: 24px;
      margin-right: 24px;
    }
  }

  button {
    width: 100px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .ant-table-body {
    max-height: calc(100vh - 540px);
    min-height: 200px;
  }
`;

export default withDirection(SelectStoreStyles);
