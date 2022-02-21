import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  ColLeft,
  ColRight,
  PlanItemLayout,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const PlanIntroduction1 = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.youaku.planIntroduction1.title"]}
        index={index}
      />
      <ColRight>
        <Input.TextArea
          disabled={disable}
          name={`${name}.planIntroduction`}
          rows={4}
        />
      </ColRight>
    </PlanItemLayout>
  );
};

PlanIntroduction1.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(PlanIntroduction1);
