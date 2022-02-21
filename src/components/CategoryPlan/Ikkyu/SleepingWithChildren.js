import React, { memo } from "react";
import { InputNumber, Radio } from "formik-antd";
import { useIntl } from "react-intl";
import IntlMessages from "@iso/components/utility/intlMessages";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { InputGroupCustom } from "@iso/components/CategoryPlan/Dairekutoin/RangeOfCharges";
import { Item } from "@iso/components/CategoryPlan/BasicPlanInfo/RoomUse";

const SleepingWithChildren = ({
  name,
  disable,
  otas = [],
  visible = true,
  index,
}) => {
  const { messages } = useIntl();

  if (!otas.includes("IKKYU_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.ikkyu.sleepingWithChildren.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <RadioGroupCustom disabled={disable} name={`${name}.sleepingWithChildren`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio
              name={`${name}.sleepingWithChildren`}
              key={idx}
              value={item.value}
            >
              {item.label}
            </Radio>
          ))}
        </RadioGroupCustom>
        <Item
          name={`${name}.numberOfChildren`}
          label={messages["page.taskAddEdit.ikkyu.sleepingWithChildren.input"]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <InputGroupCustom>
            <Input.Group className="input-group">
              <InputNumber
                disabled={disable}
                className="input-number"
                name={`${name}.numberOfChildren`}
                defaultValue={0}
                min={0}
              />
              <InputCharacter placeholder="名まで可能" disabled name="character" />
            </Input.Group>
          </InputGroupCustom>
        </Item>
      </ColRight>
    </PlanItemLayout>
  );
};

const RADIO_OPTIONS = [
  {
    value: "haveChildren",
    label: (
      <IntlMessages id="page.taskAddEdit.ikkyu.sleepingWithChildren.radio.haveChildren" />
    ),
  },
  {
    value: "noChildren",
    label: (
      <IntlMessages id="page.taskAddEdit.ikkyu.sleepingWithChildren.radio.noChildren" />
    ),
  },
];

export const InputCharacter = styled(Input)`
  &.ant-input[disabled] {
    width: 100px;
    border-left: 0;
    pointer-events: none;
    background-color: #fff;
  }
`;

export const RadioGroupCustom = styled(Radio.Group)`
  &.ant-radio-group-outline {
    margin-bottom: 20px;
  }
`;

SleepingWithChildren.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  visible: PropTypes.bool,
  otas: PropTypes.array,
  index: PropTypes.any,
};

export default memo(SleepingWithChildren);
