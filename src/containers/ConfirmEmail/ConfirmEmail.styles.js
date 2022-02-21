import styled from "styled-components";
import bgImage from "@iso/assets/images/image5.jpg";
import WithDirection from "@iso/lib/helpers/rtl";

const ConfirmEmailStyleWrapper = styled.div`
  width: 100%;
  min-height: 500px;
  height: calc(100vh - 71px);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  // background: url(${bgImage}) no-repeat center center;
  // background-size: cover;
  background: rgb(241, 243, 246);

  &:before {
    content: "";
    width: 100%;
    height: auto;
    display: flex;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${(props) => (props["data-rtl"] === "rtl" ? "inherit" : "0")};
    right: ${(props) => (props["data-rtl"] === "rtl" ? "0" : "inherit")};
  }

  .isoFormContentWrapper {
    width: 550px;
    z-index: 10;
    position: relative;
    margin: auto;
  }

  .isoFormContent {
    min-height: 100%;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    padding: 70px 20px;
    position: relative;
    background-color: #ffffff;
    border-radius: 2px;

    @media only screen and (max-width: 767px) {
      width: calc(100% - 16px);
      padding: 70px 20px;
      margin: auto;
    }
  }

  .ant-result-subtitle {
    position: relative;
  }
  .ant-btn-primary {
    width: 100px;
  }
`;

export default WithDirection(ConfirmEmailStyleWrapper);
