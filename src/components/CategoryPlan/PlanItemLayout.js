import React from "react";
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import { ROLES } from "@iso/constants/common.constant";
import { useSelector } from "react-redux";

export const PlanItemLayout = styled(Row)`
  margin-bottom: 25px;

  .ant-input-number-handler-wrap {
    visibility: hidden;
  }

  .minutes-style {
    margin-top: 5px;
    margin-left: 5px;
  }

  .d-flex {
    display: flex;
  }

  .select-full-width {
    min-width: 60px;
  }

  .m-10 {
    margin-top: 5px;
  }

  .select-fullwidth {
    width: 100%;
  }
  .left {
    .title {
      font-size: 17px;
      display: block;
    }

    .sub-title {
      display: block;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .right {
    .ant-picker {
      max-width: 300px;
    }

    .ant-picker-range {
      max-width: 550px;
    }
  }

  @media only screen and (max-width: 480px) {
    .m-10 {
      margin-bottom: 10px;
    }
  }

  @media only screen and (max-width: 1200px) {
    .left {
      .title {
        display: unset;
      }

      .sub-title {
        display: unset;
        margin-left: 5px;
      }
    }

    .right {
      margin-top: 5px;
      padding-left: 15px;
    }

    .select-full-width {
      min-width: 200px;
    }
  }
`;

export const ColLeft = ({ title, subTitles, index }) => {
  const {
    Auth: {
      user: { role },
    },
  } = useSelector((state) => state);
  return (
    <Col xs={24} xl={6} xxl={4} className="left">
      <span className="title">
        {index && role === ROLES.USER ? `( ${index} ) ${title}` : title}
      </span>
      {!_.isEmpty(subTitles) &&
        _.map(subTitles, (sub, idx) => (
          <span className="sub-title" key={idx}>
            ({sub})
          </span>
        ))}
    </Col>
  );
};

export const ColRight = ({ children }) => (
  <Col xs={24} xl={18} xxl={20} className="right">
    {children}
  </Col>
);

ColLeft.propTypes = {
  title: PropTypes.string.isRequired,
  subTitles: PropTypes.array,
  children: PropTypes.node,
  index: PropTypes.any,
  otas: PropTypes.any,
};

ColRight.propTypes = {
  children: PropTypes.node,
};

export const colFull = {
  sm: 24,
  xs: 24,
};

export const colPatternLeft = {
  sm: 5,
  md: 5,
  xs: 24,
};

export const colPatternRight = {
  sm: 19,
  md: { span: 18, offset: 1 },
  xs: 24,
};

export const itemLeftLabel = {
  labelCol: { sm: 8, lg: 8, xs: 24 },
  wrapperCol: { sm: 12, lg: 12, xs: 24 },
};

export const itemFullLabel = {
  labelCol: { lg: 24, xs: 24 },
  wrapperCol: { lg: 24, xs: 24 },
};
