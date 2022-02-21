/* eslint-disable react/display-name */
import React from "react";
import { Link } from "react-router-dom";
import Image from "@iso/assets/images/rob.png";
import IntlMessages from "@iso/components/utility/intlMessages";
import FiveZeroZeroStyleWrapper from "./500.styles";
import { PUBLIC_ROUTE } from "../../route.constants";
import { Helmet } from "react-helmet";

export default function () {
  return (
    <FiveZeroZeroStyleWrapper className="iso500Page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>500 | HLS</title>
      </Helmet>
      <div className="iso500Content">
        <h1>
          <IntlMessages id="page500.title" />
        </h1>
        <h3>
          <IntlMessages id="page500.subTitle" />
        </h3>
        <p>
          <IntlMessages id="page500.description" />
        </p>
        <Link to={PUBLIC_ROUTE.LANDING}>
          <button type="button">
            <IntlMessages id="page500.backButton" />
          </button>
        </Link>
      </div>

      <div className="iso500Artwork">
        <img alt="#" src={Image} />
      </div>
    </FiveZeroZeroStyleWrapper>
  );
}
