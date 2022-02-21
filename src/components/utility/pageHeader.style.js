import styled from "styled-components";
import { palette } from "styled-theme";
import WithDirection from "@iso/lib/helpers/rtl";
const WDComponentTitleWrapper = styled.h1`
  font-size: 19px;
  font-weight: bold;
  color: #000000;
  width: 100%;
  margin-bottom: 10px;
  padding: 0px;
  padding-left: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border-bottom: 2px solid ${palette("secondary", 3)};

  @media only screen and (max-width: 767px) {
    margin: 0;
    margin-bottom: 10px;
  }

  /*:before {
    content: '';
    width: 5px;
    height: 40px;
    background-color: ${palette("secondary", 3)};
    display: flex;
    margin: ${(props) =>
      props["data-rtl"] === "rtl" ? "0 0 0 15px" : "0 15px 0 0"};
  }*/

  /*&:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${palette("secondary", 3)};
    display: flex;
    margin: ${(props) =>
      props["data-rtl"] === "rtl" ? "0 15px 0 0" : "0 0 0 15px"};
  }*/
`;

const ComponentTitleWrapper = WithDirection(WDComponentTitleWrapper);
export { ComponentTitleWrapper };
