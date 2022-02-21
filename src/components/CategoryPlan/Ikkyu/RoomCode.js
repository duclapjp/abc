import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const RoomCode = ({ name, disable, otas = [], visible = true, index }) => {
  const { messages } = useIntl();

  if (!otas.includes("IKKYU_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.ikkyu.romCode.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <Input disabled={disable} name={`${name}.roomCode`} />
      </ColRight>
    </PlanItemLayout>
  );
};

RoomCode.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  otas: PropTypes.array,
  visible: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(RoomCode);
