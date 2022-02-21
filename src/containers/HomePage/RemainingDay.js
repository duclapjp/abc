import React from "react";
import PropTypes from "prop-types";

const RemainingDay = ({ day }) => {
  return (
    <span>
      {day === 0 ? "当日" : day < 0 ? "期限切れ" : day > 0 ? `残り${day}日` : "-"}
    </span>
  );
};

RemainingDay.propTypes = {
  day: PropTypes.number,
};

export default RemainingDay;
