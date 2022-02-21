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

const RakutenPaymentMethod = ({
  name,
  disable,
  otas = [],
  visible = true,
  index,
}) => {
  const { messages } = useIntl();

  if (!otas.includes("RAKUTEN_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rakuten.paymentMethod.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <RadioGroupVertical disabled={disable} name={`${name}.paymentMethod`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio name={`${name}.paymentMethod`} key={idx} value={item.value}>
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
    value: "localAndAdvanceCard",
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.paymentMethod.radio.localAndAdvanceCard" />
    ),
  },
  {
    value: "advanceCard",
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.paymentMethod.radio.advanceCard" />
    ),
  },
  {
    value: "local",
    label: <IntlMessages id="page.taskAddEdit.rakuten.paymentMethod.radio.local" />,
  },
];

RakutenPaymentMethod.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  visible: PropTypes.bool,
  otas: PropTypes.array,
  index: PropTypes.any,
};

export default memo(RakutenPaymentMethod);
