import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const OtherInfo = ({ name, disable }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.explanatoryText.title.otherInfo"]}
      />
      <ColRight>
        <Input.TextArea disabled={disable} rows={4} name={`${name}.otherInfo`} />
      </ColRight>
    </PlanItemLayout>
  );
};

OtherInfo.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
};

export default memo(OtherInfo);
