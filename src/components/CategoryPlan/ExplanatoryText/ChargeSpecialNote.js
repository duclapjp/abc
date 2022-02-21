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

const ChargeSpecialNote = ({ name, disable, defaultValue = {}, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.explanatoryText.title.chargeSpecialNote"]}
        subTitles={[
          messages["page.taskAddEdit.explanatoryText.sub.chargeSpecialNote0"],
          messages["page.taskAddEdit.explanatoryText.sub.chargeSpecialNote1"],
        ]}
        index={index}
      />
      <ColRight>
        <Input.TextArea
          disabled={disable}
          maxLength={maxLength}
          rows={4}
          name={`${name}.chargeSpecialNote`}
        />
        <Row align="end">
          <span>
            {get(defaultValue, "chargeSpecialNote.length") || 0} / {maxLength}
          </span>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const maxLength = 100;

ChargeSpecialNote.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  defaultValue: PropTypes.object,
  index: PropTypes.any,
};

export default memo(ChargeSpecialNote);
