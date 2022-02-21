import styled from "styled-components";

const HelpStyles = styled.div`
  .mb-30 {
    margin-bottom: 30px;
  }

  .ml-20 {
    margin-left: 20px;
  }

  .align-items-center {
    align-items: center;

    h3 {
      margin-left: 20px;
    }
  }

  .icon {
    &:before {
      font-size: 50px;
      margin-left: 20px;
    }
  }

  .icon-active {
    &:before {
      cursor: pointer;
      color: green;
    }
  }

  .icon-disabled {
    &:before {
      cursor: unset;
      color: unset;
    }
  }
`;

export { HelpStyles };
