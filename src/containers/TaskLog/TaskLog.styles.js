import styled from "styled-components";
import withDirection from "../../library/helpers/rtl";

const TaskLogStyle = styled.div`
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

  .space-btn {
    width: 100%;
  }

  .mb-5 {
    margin-bottom: 5em;
  }
`;

export default withDirection(TaskLogStyle);
