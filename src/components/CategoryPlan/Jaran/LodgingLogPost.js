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

const LodgingLogPost = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.jaran.lodgingLogPost.title"]}
        index={index}
      />
      <ColRight>
        <RadioGroupVertical disabled={disable} name={`${name}.lodgingLogPost`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio name={`${name}.lodgingLogPost`} key={idx} value={item.value}>
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
    value: "postImmediateRelease",
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.lodgingLogPost.radio.postImmediateRelease" />
    ),
  },
  {
    value: "postStop",
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.lodgingLogPost.radio.postStop" />
    ),
  },
  {
    value: "doNotPost",
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.lodgingLogPost.radio.doNotPost" />
    ),
  },
];

LodgingLogPost.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(LodgingLogPost);
