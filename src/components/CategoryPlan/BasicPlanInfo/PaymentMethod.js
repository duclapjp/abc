import React, { memo } from "react";
import { Radio } from "formik-antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const PaymentMethod = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.paymentMethod"]}
        index={index}
      />
      <ColRight>
        <Radio.Group disabled={disable} name={`${name}.paymentMethod`}>
          <Radio name={`${name}.paymentMethod`} value="paymentLocal">
            {messages["page.taskAddEdit.basicPlanInfo.checkbox.paymentMethod.local"]}
          </Radio>
          <Radio name={`${name}.paymentMethod`} value="paymentLocalAndOnline">
            {
              messages[
                "page.taskAddEdit.basicPlanInfo.checkbox.paymentMethod.localAndOnlineCard"
              ]
            }
          </Radio>
          <Radio name={`${name}.paymentMethod`} value="paymentOnline">
            {
              messages[
                "page.taskAddEdit.basicPlanInfo.checkbox.paymentMethod.onlineCard"
              ]
            }
          </Radio>
        </Radio.Group>
      </ColRight>
    </PlanItemLayout>
  );
};

PaymentMethod.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(PaymentMethod);
