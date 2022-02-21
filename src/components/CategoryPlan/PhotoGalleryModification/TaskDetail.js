import React, { memo } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Input } from "formik-antd";

import {
  ColLeft,
  ColRight,
  PlanItemLayout,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const TaskDetail = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={
          messages["page.taskAddEdit.photoGalleryModification.taskDetail.title"]
        }
        index={index}
      />
      <ColRight>
        <Input.TextArea rows={3} disabled={disable} name={`${name}.taskDetail`} />
      </ColRight>
    </PlanItemLayout>
  );
};

TaskDetail.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(TaskDetail);
