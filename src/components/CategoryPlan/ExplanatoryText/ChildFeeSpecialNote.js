import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Row } from "antd";
import { get } from "lodash";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const ChildFeeSpecialNote = ({ name, disable, defaultValue = {}, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={
          messages["page.taskAddEdit.explanatoryText.title.childFeeSpecialNote"]
        }
        subTitles={[
          messages["page.taskAddEdit.explanatoryText.sub.childFeeSpecialNote0"],
          messages["page.taskAddEdit.explanatoryText.sub.childFeeSpecialNote1"],
          messages["page.taskAddEdit.explanatoryText.sub.childFeeSpecialNote2"],
        ]}
        index={index}
      />
      <ColRight>
        <Input.TextArea
          disabled={disable}
          rows={4}
          maxLength={maxLength}
          name={`${name}.childFeeSpecialNote`}
        />
        <Row align="end">
          <span>
            {get(defaultValue, "childFeeSpecialNote.length") || 0} / {maxLength}
          </span>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const maxLength = 100;

ChildFeeSpecialNote.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  defaultValue: PropTypes.object,
  index: PropTypes.any,
};

export default memo(ChildFeeSpecialNote);
