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

const RoomTypeName = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={
          messages["page.taskAddEdit.roomCreationInstructions.roomTypeName.title"]
        }
        subTitles={[
          messages[
            "page.taskAddEdit.roomCreationInstructions.roomTypeName.subTitle"
          ],
        ]}
        index={index}
      />
      <ColRight>
        <Input.TextArea
          disabled={disable}
          name={`${name}.roomTypeName`}
          maxLength={30}
          rows={2}
        />
      </ColRight>
    </PlanItemLayout>
  );
};

RoomTypeName.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(RoomTypeName);
