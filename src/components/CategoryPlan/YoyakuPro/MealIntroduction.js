import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const MealIntroduction = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.youaku.mealIntroduction.title"]}
        index={index}
      />
      <ColRight>
        <Input.TextArea
          disabled={disable}
          name={`${name}.mealIntroduction`}
          rows={4}
        />
      </ColRight>
    </PlanItemLayout>
  );
};

MealIntroduction.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(MealIntroduction);
