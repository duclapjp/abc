import styled from "styled-components";

const LayoutTasksWrapper = styled.div`
  .space-btn {
    width: 100%;
  }

  .ant-table-tbody .ant-table-cell-with-append {
    > a {
      float: left;
    }
  }

  .ant-table-row-expand-icon-spaced {
    pointer-events: none;
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
`;

export { LayoutTasksWrapper };
