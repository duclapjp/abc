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

const MaxConsecutiveNight = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.maxConsecutiveNight"]}
        subTitles={[
          messages["page.taskAddEdit.basicPlanInfo.sub.consecutiveNight0"],
        ]}
        index={index}
      />
      <ColRight>
        <FormItem
          name={`${name}.maxConsecutiveNight`}
          labelCol={{ xs: 24, xl: 2 }}
          wrapperCol={{ xs: 24, xl: 6 }}
          label={
            messages[
              "page.taskAddEdit.basicPlanInfo.placeholder.maxNightConsecutive"
            ]
          }
        >
          <Input
            disabled={disable}
            name={`${name}.maxConsecutiveNight`}
            suffix={
              messages[
                "page.taskAddEdit.basicPlanInfo.placeholder.maxNightConsecutive.suffix"
              ]
            }
          />
        </FormItem>
      </ColRight>
    </PlanItemLayout>
  );
};

MaxConsecutiveNight.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(MaxConsecutiveNight);
