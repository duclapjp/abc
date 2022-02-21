import React, { memo } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Input } from "formik-antd";

import {
  ColLeft,
  ColRight,
  PlanItemLayout,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const Caption = ({ name, disable, index, otas }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.photoGalleryModification.caption.title"]}
        index={[21, 22].includes(index) ? 10 : index}
        otas={otas}
      />
      <ColRight>
        <Input.TextArea rows={4} disabled={disable} name={`${name}.caption`} />
      </ColRight>
    </PlanItemLayout>
  );
};

Caption.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
  otas: PropTypes.any,
};

export default memo(Caption);
