import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import { Row } from "antd";
import PropsTypes from "prop-types";
import { get } from "lodash";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const PlanContent = ({ name, disable, defaultValue = {}, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.explanatoryText.title.planContent"]}
        subTitles={[messages["page.taskAddEdit.explanatoryText.sub.planContent"]]}
        index={index}
      />
      <ColRight>
        <Input.TextArea
          disabled={disable}
          maxLength={maxLength}
          rows={4}
          name={`${name}.planContent`}
        />
        <Row justify="end">
          <span>
            {get(defaultValue, "planContent.length") || 0} / {maxLength}
          </span>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const maxLength = 1000;

PlanContent.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  defaultValue: PropsTypes.object,
  index: PropTypes.any,
};

export default memo(PlanContent);
