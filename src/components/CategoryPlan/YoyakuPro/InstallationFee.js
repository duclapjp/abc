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

const InstallationFee = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.youaku.installationFee.title"]}
        index={index}
      />
      <ColRight>
        <RadioGroupVertical disabled={disable} name={`${name}.installationFee`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio name={`${name}.installationFee`} key={idx} value={item.value}>
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
    value: "applyChange",
    label: (
      <IntlMessages id="page.taskAddEdit.youaku.installationFee.radio.applyChange" />
    ),
  },
  {
    value: "applyNew",
    label: (
      <IntlMessages id="page.taskAddEdit.youaku.installationFee.radio.applyNew" />
    ),
  },
];

InstallationFee.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(InstallationFee);
