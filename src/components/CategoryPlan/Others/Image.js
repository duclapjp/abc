import React, { memo } from "react";
import { Input } from "formik-antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const Image = ({ name, disable, index, otas }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.other.image.title"]}
        index={[20, 21].includes(index) ? 9 : index}
        otas={otas}
      />
      <ColRight>
        <Input.TextArea disabled={disable} rows={4} name={`${name}.image`} />
      </ColRight>
    </PlanItemLayout>
  );
};

Image.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
  otas: PropTypes.any,
};

export default memo(Image);
