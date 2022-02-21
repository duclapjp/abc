import React, { memo } from "react";
import { useIntl } from "react-intl";
import { Collapse } from "antd";
import { Radio } from "formik-antd";
import PropsTypes from "prop-types";
import { map } from "lodash";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const RoomType = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.roomCreationInstructions.roomType.title"]}
        index={index}
      />
      <ColRight>
        <Collapse>
          <Collapse.Panel
            header={
              messages[
                "page.taskAddEdit.roomCreationInstructions.roomType.westernStyleRoom"
              ]
            }
          >
            <Radio.Group disabled={disable} name={`${name}.westernStyleRoom`}>
              {map(options1(messages), (opt, idx) => (
                <Radio value={opt.value} key={idx}>
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          </Collapse.Panel>
          <Collapse.Panel
            header={
              messages[
                "page.taskAddEdit.roomCreationInstructions.roomType.japaneseStyleRoom"
              ]
            }
          >
            <Radio.Group disabled={disable} name={`${name}.japaneseStyleRoom`}>
              {map(options2(messages), (opt, idx) => (
                <Radio value={opt.value} key={idx}>
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          </Collapse.Panel>
        </Collapse>
      </ColRight>
    </PlanItemLayout>
  );
};

const options1 = (messages) => [
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomType.single"],
    value: "single",
  },
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomType.semiDouble"],
    value: "semiDouble",
  },
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomType.double"],
    value: "double",
  },
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomType.twin"],
    value: "twin",
  },
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomType.triple"],
    value: "triple",
  },
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomType.fourBeds"],
    value: "fourBeds",
  },
  {
    label: messages["page.dashboard.button.other"],
    value: "other",
  },
];

const options2 = (messages) => [
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomType.japaneseStyleRoom"
      ],
    value: "japaneseStyleRoom",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomType.japaneseWesternRoom"
      ],
    value: "japaneseWesternRoom",
  },
];

RoomType.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(RoomType);
