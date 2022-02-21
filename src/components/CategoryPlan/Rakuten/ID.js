import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const ID = ({ name, disable, otas = [], visible = true, index }) => {
  const { messages } = useIntl();

  if (!otas.includes("RAKUTEN_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rakuten.id.title"]}
        subTitles={[messages["page.taskAddEdit.rakuten.id.sub.limit"]]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <Input disabled={disable} name={`${name}.id`} maxLength={10} />
      </ColRight>
    </PlanItemLayout>
  );
};

ID.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  visible: PropTypes.bool,
  otas: PropTypes.array,
  index: PropTypes.any,
};

export default memo(ID);
