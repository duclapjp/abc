import styled from "styled-components";

import withDirection from "@iso/lib/helpers/rtl";

const HomePageStyles = styled.div`
  .mb-40 {
    margin-bottom: 40px;
  }

  .ant-typography {
    margin-bottom: 20px;
  }

  .ant-table-tbody .ant-table-cell-with-append {
    > a {
      float: left;
    }
  }

  .ant-table-row-expand-icon-spaced {
    pointer-events: none;
  }

  .ant-card-body {
    padding: 24px 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow-x: auto;

    .ant-space {
      padding: 0 24px;
    }
  }
`;

export default withDirection(HomePageStyles);
