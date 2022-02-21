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

const Grade = ({ name, disable, otas = [], visible = true, index }) => {
  const { messages } = useIntl();

  if (!otas.includes("JARAN_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.jaran.grade.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <RadioGroupVertical disabled={disable} name={`${name}.grade`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio name={`${name}.grade`} key={idx} value={item.value}>
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
    value: "standard",
    label: <IntlMessages id="page.taskAddEdit.jaran.grade.radio.standard" />,
  },
  {
    value: "regular",
    label: <IntlMessages id="page.taskAddEdit.jaran.grade.radio.regular" />,
  },
  {
    value: "economy",
    label: <IntlMessages id="page.taskAddEdit.jaran.grade.radio.economy" />,
  },
  {
    value: "superior",
    label: <IntlMessages id="page.taskAddEdit.jaran.grade.radio.superior" />,
  },
  {
    value: "deluxe",
    label: <IntlMessages id="page.taskAddEdit.jaran.grade.radio.deluxe" />,
  },
  {
    value: "suite",
    label: <IntlMessages id="page.taskAddEdit.jaran.grade.radio.suite" />,
  },
];

Grade.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  visible: PropTypes.bool,
  otas: PropTypes.array,
  index: PropTypes.any,
};

export default memo(Grade);
