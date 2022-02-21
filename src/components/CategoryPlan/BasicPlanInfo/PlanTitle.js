import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { get } from "lodash";
import { Row } from "antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const PlanTitle = ({ name, disable, defaultValue = {}, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.planTitle"]}
        subTitles={[messages["page.taskAddEdit.basicPlanInfo.sub.planTitle0"]]}
        index={index}
      />
      <ColRight>
        <Input disabled={disable} name={`${name}.planTitle`} maxLength={maxLength} />
        <Row align="end">
          <span>
            {get(defaultValue, "planTitle.length") || 0} / {maxLength}
          </span>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const maxLength = 50;

PlanTitle.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  defaultValue: PropTypes.object,
  index: PropTypes.any,
};

export default memo(PlanTitle);
