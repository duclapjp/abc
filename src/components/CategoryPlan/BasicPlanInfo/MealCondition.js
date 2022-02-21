import React, { memo } from "react";
import { Checkbox } from "formik-antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const MealCondition = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.mealCondition"]}
        index={index}
      />
      <ColRight>
        <Checkbox.Group
          disabled={disable}
          name={`${name}.mealCondition`}
          options={options(messages)}
        />
      </ColRight>
    </PlanItemLayout>
  );
};

const options = (messages) => [
  {
    label:
      messages["page.taskAddEdit.basicPlanInfo.checkbox.mealCondition.breakfast"],
    value: "breakfast",
  },
  {
    label: messages["page.taskAddEdit.basicPlanInfo.checkbox.mealCondition.lunch"],
    value: "lunch",
  },
  {
    label: messages["page.taskAddEdit.basicPlanInfo.checkbox.mealCondition.dinner"],
    value: "dinner",
  },
];

MealCondition.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(MealCondition);
