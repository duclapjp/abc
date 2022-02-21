import React, { memo } from "react";
import * as Antd from "antd";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { InputGroupWrapper } from "@iso/components/CategoryPlan/RoomCreationInstructions/AmountPeople";
import PropTypes from "prop-types";

const TargetPeriod = ({ name, disable, index, otas }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.other.targetPeriod.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <InputGroupWrapper compact>
          <Input disabled={disable} name={`${name}.from`} suffix={"月"} />
          <Antd.Input disabled value="~" />
          <Input disabled={disable} name={`${name}.to`} suffix={"月"} />
        </InputGroupWrapper>
      </ColRight>
    </PlanItemLayout>
  );
};

TargetPeriod.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
  otas: PropTypes.any,
};

export default memo(TargetPeriod);
