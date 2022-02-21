import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  ColLeft,
  ColRight,
  PlanItemLayout,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const PlanIntroduction2 = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.youaku.planIntroduction2.title"]}
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

PlanIntroduction2.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(PlanIntroduction2);
