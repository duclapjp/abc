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

const LimitMenWomen = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rurubu.limitMenWomen.title"]}
        index={index}
      />
      <ColRight>
        <RadioGroupVertical disabled={disable} name={`${name}.genderLimit`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio name={`${name}.genderLimit`} key={idx} value={item.value}>
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
    value: "menAndWomen",
    label: (
      <IntlMessages id="page.taskAddEdit.rurubu.limitMenWomen.radio.menAndWomen" />
    ),
  },
  {
    value: "men",
    label: <IntlMessages id="page.taskAddEdit.rurubu.limitMenWomen.radio.men" />,
  },
  {
    value: "women",
    label: <IntlMessages id="page.taskAddEdit.rurubu.limitMenWomen.radio.women" />,
  },
];

LimitMenWomen.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(LimitMenWomen);
