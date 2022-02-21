import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import styled from "styled-components";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const PlanRank = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.planRank"]}
        index={index}
      />
      <ColRight>
        <InputCustom
          disabled={disable}
          name={`${name}.planRank`}
          suffix={messages["page.taskAddEdit.basicPlanInfo.placeholder.index"]}
        />
      </ColRight>
    </PlanItemLayout>
  );
};

const InputCustom = styled(Input)`
  &.ant-input-affix-wrapper {
    width: 100%;
  }
`;

PlanRank.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(PlanRank);
