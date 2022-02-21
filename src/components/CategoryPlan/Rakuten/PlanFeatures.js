import React, { memo } from "react";
import { Checkbox } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const PlanFeatures = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rakuten.planFeatures.title"]}
        index={index}
      />
      <ColRight>
        <Checkbox disabled={disable} name={`${name}.planWithVoucher`}>
          {
            messages[
              "page.taskAddEdit.rakuten.planFeatures.checkbox.planWithVoucher"
            ]
          }
        </Checkbox>
      </ColRight>
    </PlanItemLayout>
  );
};

PlanFeatures.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(PlanFeatures);
