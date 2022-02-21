import React, { memo } from "react";
import { Input, FormItem } from "formik-antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const MinConsecutiveNight = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.minConsecutiveNight"]}
        subTitles={[
          messages["page.taskAddEdit.basicPlanInfo.sub.consecutiveNight0"],
        ]}
        index={index}
      />
      <ColRight>
        <FormItem
          labelCol={{ xs: 24, xl: 2 }}
          wrapperCol={{ xs: 24, xl: 6 }}
          name={`${name}.minConsecutiveNight`}
          label={
            messages[
              "page.taskAddEdit.basicPlanInfo.placeholder.minNightConsecutive"
            ]
          }
        >
          <Input
            disabled={disable}
            name={`${name}.minConsecutiveNight`}
            suffix={
              messages[
                "page.taskAddEdit.basicPlanInfo.placeholder.minNightConsecutive.suffix"
              ]
            }
          />
        </FormItem>
      </ColRight>
    </PlanItemLayout>
  );
};

MinConsecutiveNight.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(MinConsecutiveNight);
