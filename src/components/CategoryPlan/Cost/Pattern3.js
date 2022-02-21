import React from "react";
import PropTypes from "prop-types";

import PriceChildren from "./CostComponent/PriceForChildren";
import CancellationPolicy from "./CostComponent/CancellationPolicy";

const Pattern3 = ({ name, disable }) => {
  return (
    <>
      <PriceChildren name={name} disable={disable} />
      <CancellationPolicy name={name} disable={disable} />
    </>
  );
};

Pattern3.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
};

export default Pattern3;
