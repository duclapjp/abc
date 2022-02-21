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

const SalesDestination = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rakuten.salesDestination.title"]}
        index={index}
      />
      <ColRight>
        <RadioGroupVertical disabled={disable} name={`${name}.package`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio name={`${name}.package`} key={idx} value={item.value}>
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
    value: "accommodationOnly",
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.salesDestination.radio.accommodationOnly" />
    ),
  },
  {
    value: "sales",
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.salesDestination.radio.salesDestinationPackage" />
    ),
  },
];

SalesDestination.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(SalesDestination);
