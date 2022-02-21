import React, { memo } from "react";
import styled from "styled-components";
import { Form, Input, Radio } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import { PlanItemLayout, ColLeft, ColRight } from "../PlanItemLayout";

const RoomUse = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.roomUse"]}
        index={index}
      />
      <ColRight>
        <RadioGroupVertical disabled={disable} name={`${name}.roomUse`}>
          <Radio name={`${name}.roomUse`} value="all">
            {messages["page.taskAddEdit.basicPlanInfo.checkbox.allSelling"]}
          </Radio>
          <Radio name={`${name}.roomUse`} value="other">
            {messages["page.taskAddEdit.basicPlanInfo.checkbox.otherSelling"]}
          </Radio>
        </RadioGroupVertical>
        <Input.TextArea disabled={disable} name={`${name}.desc`} rows={4} />
      </ColRight>
    </PlanItemLayout>
  );
};

export const Item = styled(Form.Item)`
  &.ant-form-item {
    margin-bottom: 0;
  }
`;

export const RadioGroupVertical = styled(Radio.Group)`
  &.ant-radio-group {
    margin-bottom: 10px;
    .ant-radio-wrapper {
      display: block;
      height: 30px;
      line-height: 30px;
    }
  }
`;

RoomUse.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(RoomUse);
