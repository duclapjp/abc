import React, { memo } from "react";
import { Radio } from "formik-antd";
import { useIntl } from "react-intl";
import IntlMessages from "@iso/components/utility/intlMessages";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { RadioGroupVertical } from "@iso/components/CategoryPlan/BasicPlanInfo/RoomUse";

const AcceptanceConditions = ({
  name,
  disable,
  otas = [],
  visible = true,
  index,
}) => {
  const { messages } = useIntl();

  if (!otas.includes("JARAN_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.jaran.acceptanceConditions.title"]}
        index={index}
      />
      <ColRight>
        <RadioGroupVertical disabled={disable} name={`${name}.acceptanceConditions`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio
              name={`${name}.acceptanceConditions`}
              key={idx}
              value={item.value}
            >
              {item.label}
            </Radio>
          ))}
        </RadioGroupVertical>
      </ColRight>
    </PlanItemLayout>
  );
};

const RADIO_OPTIONS = [
  {
    value: "menOnly",
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.acceptanceConditions.radio.menOnly" />
    ),
  },
  {
    value: "womenOnly",
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.acceptanceConditions.radio.womenOnly" />
    ),
  },
  {
    value: "cannotSpecifyRoom",
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.acceptanceConditions.radio.cannotSpecifyRoom" />
    ),
  },
  {
    value: "sharedRoom",
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.acceptanceConditions.radio.sharedRoom" />
    ),
  },
  {
    value: "capsuleRoom",
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.acceptanceConditions.radio.capsuleRoom" />
    ),
  },
];

AcceptanceConditions.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  visible: PropTypes.bool,
  otas: PropTypes.array,
  index: PropTypes.any,
};

export default memo(AcceptanceConditions);
