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

const View = ({ name, disable, otas = [], visible = true, index }) => {
  const { messages } = useIntl();

  if (!otas.includes("JARAN_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.jaran.view.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <RadioGroupVertical disabled={disable} name={`${name}.view`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio name={`${name}.view`} key={idx} value={item.value}>
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
    value: "lakeSide",
    label: <IntlMessages id="page.taskAddEdit.jaran.view.radio.lakeSide" />,
  },
  {
    value: "mountainSide",
    label: <IntlMessages id="page.taskAddEdit.jaran.view.radio.mountainSide" />,
  },
  {
    value: "seaSide",
    label: <IntlMessages id="page.taskAddEdit.jaran.view.radio.seaSide" />,
  },
  {
    value: "riverSide",
    label: <IntlMessages id="page.taskAddEdit.jaran.view.radio.riverSide" />,
  },
  {
    value: "portSide",
    label: <IntlMessages id="page.taskAddEdit.jaran.view.radio.portSide" />,
  },
  {
    value: "gardenSide",
    label: <IntlMessages id="page.taskAddEdit.jaran.view.radio.gardenSide" />,
  },
  {
    value: "citySide",
    label: <IntlMessages id="page.taskAddEdit.jaran.view.radio.citySide" />,
  },
];

View.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  visible: PropTypes.bool,
  otas: PropTypes.array,
  index: PropTypes.any,
};

export default memo(View);
