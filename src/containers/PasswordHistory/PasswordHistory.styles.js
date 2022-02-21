import styled from "styled-components";
import withDirection from "@iso/lib/helpers/rtl";

const PasswordHistoryStyles = styled.div`
  @media only screen and (max-width: 768px) {
    .xs-pb-2 {
      padding-bottom: 2em;
    }
  }

  @media only screen and (min-width: 768px) {
    .mb-3 {
      margin-bottom: 3em;
    }
  }

  .see-more {
    font-weight: bold;
    display: flex;
    margin-top: 25px;
    justify-content: center;
  }

  .pointer {
    cursor: pointer;
  }

  .not-allowed {
    cursor: not-allowed;
    color: #d9d9d9;
  }
`;

export default withDirection(PasswordHistoryStyles);
