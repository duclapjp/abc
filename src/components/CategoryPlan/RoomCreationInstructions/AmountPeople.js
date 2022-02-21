import React, { memo } from "react";
import { Input } from "formik-antd";
import * as Antd from "antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";
import styled from "styled-components";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const AmountPeople = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={
          messages["page.taskAddEdit.roomCreationInstructions.amountPeople.title"]
        }
        index={index}
      />
      <ColRight>
        <InputGroupWrapper compact>
          <Input disabled={disable} name={`${name}.from`} suffix={"人"} />
          <Antd.Input disabled value="~" />
          <Input disabled={disable} name={`${name}.to`} suffix={"人"} />
        </InputGroupWrapper>
      </ColRight>
    </PlanItemLayout>
  );
};

export const InputGroupWrapper = styled(Antd.Input.Group)`
  &.ant-input-group {
    .ant-input-affix-wrapper {
      width: 30%;

      .ant-input {
        width: 100%;
      }
    }

    .ant-input-disabled {
      width: 5%;
      text-align: center;
    }

    @media only screen and (max-width: 1200px) {
      .ant-input-affix-wrapper {
        width: 15%;

        .ant-input {
          width: 100%;
        }
      }
    }
  }
`;

AmountPeople.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(AmountPeople);
