import React, { memo } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Input } from "formik-antd";

import {
  ColLeft,
  ColRight,
  PlanItemLayout,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const DisplaySettingAndArrangement = ({ name, disable, index, otas }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={
          messages[
            "page.taskAddEdit.photoGalleryModification.displaySettingAndArrangement.title"
          ]
        }
        index={index}
        otas={otas}
      />
      <ColRight>
        <Input disabled={disable} name={`${name}.displaySettingAndArrangement`} />
      </ColRight>
    </PlanItemLayout>
  );
};

DisplaySettingAndArrangement.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
  otas: PropTypes.any,
};

export default memo(DisplaySettingAndArrangement);
