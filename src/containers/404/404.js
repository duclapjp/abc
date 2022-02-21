/* eslint-disable react/display-name */
import React from "react";
import { Link } from "react-router-dom";
import Image from "@iso/assets/images/rob.png";
import IntlMessages from "@iso/components/utility/intlMessages";
import FourZeroFourStyleWrapper from "./404.styles";
import { PUBLIC_ROUTE } from "../../route.constants";
import { Helmet } from "react-helmet";

export default function () {
  return (
    <FourZeroFourStyleWrapper className="iso404Page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 | HLS</title>
      </Helmet>
      <div className="iso404Content">
        <h1>
          <IntlMessages id="page404.title" />
        </h1>
        <h3>
          <IntlMessages id="page404.subTitle" />
        </h3>
        <p>
          <IntlMessages id="page404.description" />
        </p>
        <Link to={PUBLIC_ROUTE.LANDING}>
          <button type="button">
            <IntlMessages id="page404.backButton" />
          </button>
        </Link>
      </div>

      <div className="iso404Artwork">
        <img alt="#" src={Image} />
      </div>
    </FourZeroFourStyleWrapper>
  );
}
