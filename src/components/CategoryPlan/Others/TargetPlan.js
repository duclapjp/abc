import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const TargetPlan = ({ name, disable }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft title={messages["page.taskAddEdit.other.targetPlan.title"]} />
      <ColRight>
        <Input.TextArea disabled={disable} rows={4} name={`${name}.targetPlan`} />
      </ColRight>
    </PlanItemLayout>
  );
};

TargetPlan.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
};

export default memo(TargetPlan);
