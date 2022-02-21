import React, { memo, useState, useEffect } from "react";
import * as Antd from "antd";
import { useIntl } from "react-intl";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { Input } from "formik-antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const RewardPoints = ({
  name,
  disable,
  defaultValue = {},
  setFieldValue,
  index,
}) => {
  const [initNumber, setInitNumber] = useState(0);
  const { messages } = useIntl();

  useEffect(() => {
    if (!defaultValue["rewardPoint"]) {
      setFieldValue(`${name}.rewardPoint`, 1);
      setInitNumber(0);
    }
  }, [setFieldValue, name, defaultValue]);

  useEffect(() => {
    if (defaultValue["rewardPoint"]) {
      setInitNumber(defaultValue["rewardPoint"] - 1);
    }
  }, [defaultValue]);

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.rewardPoints"]}
        subTitles={[messages["page.taskAddEdit.basicPlanInfo.sub.rewardPoints"]]}
        index={index}
      />
      <ColRight>
        <InputGroupWrapper compact>
          <Antd.Input
            value={1}
            prefix={messages["page.taskAddEdit.basicPlanInfo.rewardPoint.normal"]}
            suffix="%"
            disabled={true}
          />
          <Antd.Input placeholder="+" disabled={true} />
          <Antd.InputNumber
            disabled={disable}
            value={initNumber}
            onChange={(value) => {
              if (typeof value === "number") {
                setInitNumber(value);
                setFieldValue(`${name}.rewardPoint`, 1 + value);
              } else {
                setInitNumber(initNumber);
              }
            }}
            placeholder={messages["page.taskAddEdit.basicPlanInfo.rewardPoint.add"]}
            min={0}
            max={99}
          />
          <Antd.Input placeholder="=" disabled={true} />
          <Input
            name={`${name}.rewardPoint`}
            prefix={messages["page.taskAddEdit.basicPlanInfo.rewardPoint.result"]}
            suffix="%"
            disabled={true}
          />
        </InputGroupWrapper>
      </ColRight>
    </PlanItemLayout>
  );
};

const InputGroupWrapper = styled(Antd.Input.Group)`
  &.ant-input-group {
    & > input {
      width: 5%;
      text-align: center;
    }

    & > span {
      text-align: right;
    }
  }

  @media only screen and (min-width: 1200px) {
    &.ant-input-group {
      & > span {
        width: 30%;
      }

      .ant-input-number {
        width: 30%;
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    &.ant-input-group {
      .ant-input-number {
        width: 95%;
      }

      & > span {
        width: 95%;

        &:last-child {
          width: 100%;
        }
      }
    }
  }
`;

RewardPoints.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  defaultValue: PropsTypes.object,
  setFieldValue: PropsTypes.func,
  index: PropTypes.any,
};

export default memo(RewardPoints);
