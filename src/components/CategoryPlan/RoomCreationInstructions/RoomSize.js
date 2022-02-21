import React, { memo } from "react";
import { Input } from "formik-antd";
import { Space } from "antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";
import styled from "styled-components";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const RoomSize = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.roomCreationInstructions.roomSize.title"]}
        index={index}
      />
      <ColRight>
        <Space size={15}>
          <InputWrapper
            suffix="平米"
            name={`${name}.squareMeter`}
            disabled={disable}
          />
          <InputWrapper suffix="畳" name={`${name}.tatami`} disabled={disable} />
        </Space>
      </ColRight>
    </PlanItemLayout>
  );
};

const InputWrapper = styled(Input)`
  &.ant-input-number {
    width: 100%;
  }
`;

RoomSize.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(RoomSize);
