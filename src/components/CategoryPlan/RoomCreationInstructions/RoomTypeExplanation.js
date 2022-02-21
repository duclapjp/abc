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

const RoomTypeExplanation = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={
          messages[
            "page.taskAddEdit.roomCreationInstructions.roomTypeExplanation.title"
          ]
        }
        subTitles={[
          messages[
            "page.taskAddEdit.roomCreationInstructions.roomTypeExplanation.subTitle"
          ],
        ]}
        index={index}
      />
      <ColRight>
        <Input.TextArea
          disabled={disable}
          name={`${name}.roomTypeExplanation`}
          maxLength={80}
          rows={4}
        />
      </ColRight>
    </PlanItemLayout>
  );
};

RoomTypeExplanation.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(RoomTypeExplanation);
