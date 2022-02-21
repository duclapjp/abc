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

const PackagePlanContent = ({ name, disable, defaultValue = {}, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.explanatoryText.title.packagePlanContent"]}
        subTitles={[
          messages["page.taskAddEdit.explanatoryText.sub.packagePlanContent"],
        ]}
        index={index}
      />
      <ColRight>
        <Input.TextArea
          disabled={disable}
          rows={4}
          maxLength={1000}
          name={`${name}.packPlanContent`}
        />
        <Row align="end">
          <span>
            {get(defaultValue, "packPlanContent.length") || 0} / {maxLength}
          </span>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const maxLength = 1000;

PackagePlanContent.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  defaultValue: PropTypes.object,
  index: PropTypes.any,
};

export default memo(PackagePlanContent);
