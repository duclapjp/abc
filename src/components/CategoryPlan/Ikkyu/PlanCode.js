import React, { memo } from "react";
import { InputNumber, FormItem } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Row } from "antd";
import { get } from "lodash";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const PlanCode = ({ name, disable, defaultValue = {}, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.ikkyu.planCode.title"]}
        subTitles={[messages["page.taskAddEdit.ikkyu.planCode.sub.limit"]]}
        index={index}
      />
      <ColRight>
        <FormItem name={`${name}.planCode`} wrapperCol={{ xs: 24, lg: 10 }}>
          <InputNumber
            disabled={disable}
            name={`${name}.planCode`}
            maxLength={maxLength}
          />
          <Row align="end">
            <span>
              {get(defaultValue, "planCode.length") || 0} / {maxLength}
            </span>
          </Row>
        </FormItem>
      </ColRight>
    </PlanItemLayout>
  );
};

const maxLength = 10;

PlanCode.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  defaultValue: PropTypes.object,
  index: PropTypes.any,
};

export default memo(PlanCode);
