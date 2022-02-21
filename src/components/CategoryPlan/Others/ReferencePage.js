import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const ReferencePage = ({ name, disable, index, otas }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.other.referencePage.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <Input disabled={disable} name={`${name}.referencePage`} />
      </ColRight>
    </PlanItemLayout>
  );
};

ReferencePage.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
  otas: PropTypes.any,
};

export default memo(ReferencePage);
