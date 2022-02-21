import React, { memo } from "react";
import { Input, Checkbox } from "formik-antd";
import { useIntl } from "react-intl";
import styled from "styled-components";
import PropTypes from "prop-types";
import { get } from "lodash";
import { Row } from "antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const QuestionsToBooker = ({ name, disable, defaultValue = {}, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.explanatoryText.title.questionsToBooker"]}
        subTitles={[
          messages["page.taskAddEdit.explanatoryText.sub.questionsToBooker"],
        ]}
        index={index}
      />
      <ColRight>
        <Input.TextArea
          disabled={disable}
          maxLength={maxLength}
          rows={4}
          name={`${name}.question`}
        />
        <Row align="end">
          <span>
            {get(defaultValue, "question.length") || 0} / {maxLength}
          </span>
        </Row>
        <CheckboxCustom disabled={disable} name={`${name}.requireAnswer`}>
          {messages["page.taskAddEdit.explanatoryText.placeholder.requireAnswer"]}
        </CheckboxCustom>
      </ColRight>
    </PlanItemLayout>
  );
};

const maxLength = 200;

const CheckboxCustom = styled(Checkbox)`
  &.ant-checkbox-wrapper {
    margin-top: 10px;
  }
`;

QuestionsToBooker.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  defaultValue: PropTypes.object,
  index: PropTypes.any,
};

export default memo(QuestionsToBooker);
