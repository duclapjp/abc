import React, { memo } from "react";
import { Input } from "antd";
import { InputNumber } from "formik-antd";
import styled from "styled-components";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const RangeOfCharges = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.dairekutoin.rangeOfCharges.title"]}
        index={index}
      />
      <ColRight>
        <InputGroupCustom>
          <Input.Group className="input-group" name={`${name}.amount`}>
            <InputNumber
              disabled={disable}
              className="input-min"
              name={`${name}.amount.minAmount`}
              defaultValue={0}
              min={0}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\s?|(,*)/g, "")}
            />
            <InputCharacter placeholder="～" disabled name="character" />
            <InputNumber
              disabled={disable}
              className="input-max"
              name={`${name}.amount.maxAmount`}
              defaultValue={0}
              min={0}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\s?|(,*)/g, "")}
            />
          </Input.Group>
        </InputGroupCustom>
      </ColRight>
    </PlanItemLayout>
  );
};

export const InputGroupCustom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;

  .input-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    text-align: center;
  }

  .input-min {
    max-width: 250px;
    min-width: 60px;
    text-align: left;
    border-right-width: 0px;
  }

  .input-max {
    max-width: 250px;
    min-width: 60px;
    text-align: left;
    border-left-width: 0;
  }

  .input-number {
    max-width: 100px;
    min-width: 60px;
    text-align: left;
    border-right-width: 0px;
  }

  .input-number-item {
    max-width: 200px;
    min-width: 60px;
    text-align: left;
    border-right-width: 0px;
  }
`;

export const InputCharacter = styled(Input)`
  &.ant-input[disabled] {
    width: 65px;
    border-left: 0px;
    border-right: 0px;
    pointer-events: none;
    background-color: #fff;
  }
`;

RangeOfCharges.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(RangeOfCharges);
