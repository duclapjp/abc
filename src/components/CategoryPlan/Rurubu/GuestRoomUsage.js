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

const GuestRoomUsage = ({ name, disable, otas = [], visible = true, index }) => {
  const { messages } = useIntl();

  if (!otas.includes("RURUBU_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rurubu.guestRoomUsage.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <Radio.Group disabled={disable} name={`${name}.guestRoomUsage`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio name={`${name}.guestRoomUsage`} key={idx} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </ColRight>
    </PlanItemLayout>
  );
};

const RADIO_OPTIONS = [
  {
    value: "stay",
    label: <IntlMessages id="page.taskAddEdit.rurubu.guestRoomUsage.radio.stay" />,
  },
  {
    value: "dayTrip",
    label: (
      <IntlMessages id="page.taskAddEdit.rurubu.guestRoomUsage.radio.dayTrip" />
    ),
  },
];

GuestRoomUsage.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  visible: PropTypes.bool,
  otas: PropTypes.array,
  index: PropTypes.any,
};

export default memo(GuestRoomUsage);
