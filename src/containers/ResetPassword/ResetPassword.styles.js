import styled from "styled-components";
import { palette } from "styled-theme";
import bgImage from "@iso/assets/images/image5.jpg";
import WithDirection from "@iso/lib/helpers/rtl";

const ResetPasswordStyleWrapper = styled.div`
  width: 100%;
  min-height: 500px;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;

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
    display: flex;
    flex-direction: column;
    padding: 70px 65px;
    position: relative;
    background-color: #ffffff;
    border-radius: 2px;

    @media only screen and (max-width: 767px) {
      width: calc(100% - 16px);
      padding: 70px 20px;
      margin: auto;
    }

    .isoLogoWrapper {
      width: 100%;
      display: flex;
      margin-bottom: 30px;
      justify-content: center;
      flex-shrink: 0;

      font-size: 24px;
      font-weight: 300;
      line-height: 1;
      text-transform: uppercase;
    }

    .isoFormHeadText {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-bottom: 15px;
      justify-content: center;

      margin: 0;
      text-align: center;
    }

    .isoResetPassForm {
      width: 100%;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      .isoInputWrapper {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        input {
          &::-webkit-input-placeholder {
            color: ${palette("grayscale", 0)};
          }

          &:-moz-placeholder {
            color: ${palette("grayscale", 0)};
          }

          &::-moz-placeholder {
            color: ${palette("grayscale", 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette("grayscale", 0)};
          }
        }
      }
    }

    .toSignin {
      text-align: center;
      text-decoration: underline;

      &:hover {
        color: ${palette("primary", 0)};
      }
    }

    button {
      font-weight: 500;

      &.btnSubmitReset {
        margin-bottom: 16px;
      }
    }
  }
`;

export default WithDirection(ResetPasswordStyleWrapper);
