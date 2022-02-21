import React, { memo } from "react";
import { useIntl } from "react-intl";
import { Row, Col } from "antd";
import { Checkbox } from "formik-antd";
import PropsTypes from "prop-types";
import styled from "styled-components";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const RoomEquipment = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={
          messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.title"]
        }
        index={index}
      />
      <ColRight>
        <Row>
          <ColWrapper xs={24} xxl={18}>
            <Checkbox.Group
              disabled={disable}
              name={`${name}.roomEquipment`}
              options={options1(messages)}
            />
          </ColWrapper>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const ColWrapper = styled(Col)`
  &.ant-col {
    .ant-checkbox-group-item {
      margin-bottom: 10px;
      margin-right: 16px;
    }
  }
`;

const options1 = (messages) => [
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.nonSmokingRoom"
      ],
    value: "nonSmokingRoom",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.smokingRoom"
      ],
    value: "smokingRoom",
  },
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.wifi"],
    value: "wifi",
  },
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.LAN"],
    value: "LAN",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.livingRoomAndBathRoomOutDoor"
      ],
    value: "livingRoomAndBathRoomOutDoor",
  },
  {
    label:
      messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.remoteRoom"],
    value: "remoteRoom",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.roomWithJacuzzi"
      ],
    value: "roomWithJacuzzi",
  },
  {
    label:
      messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.cornerRoom"],
    value: "cornerRoom",
  },
  {
    label:
      messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.twoOrMore"],
    value: "twoOrMore",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.toiletWithWashingMachine"
      ],
    value: "toiletWithWashingMachine",
  },
  {
    label:
      messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.highFloor"],
    value: "highFloor",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.canSeeNightView"
      ],
    value: "canSeeNightView",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.visibleTheSea"
      ],
    value: "visibleTheSea",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.visibleTheMountain"
      ],
    value: "visibleTheMountain",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.visibleTheLake"
      ],
    value: "visibleTheLake",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.visibleTheRiver"
      ],
    value: "visibleTheRiver",
  },
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.petOK"],
    value: "petOK",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.withBalconyTerrace"
      ],
    value: "withBalconyTerrace",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.bathAndToiletAreSeparated"
      ],
    value: "bathAndToiletAreSeparated",
  },
  {
    label: messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.noBus"],
    value: "noBus",
  },
  {
    label:
      messages["page.taskAddEdit.roomCreationInstructions.roomEquipment.noToilet"],
    value: "noToilet",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.barrierFree"
      ],
    value: "barrierFree",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.withHumidifier"
      ],
    value: "withHumidifier",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.withAirPurifier"
      ],
    value: "withAirPurifier",
  },
  {
    label:
      messages[
        "page.taskAddEdit.roomCreationInstructions.roomEquipment.thereIsAnOutletOnTheBedside"
      ],
    value: "thereIsAnOutletOnTheBedside",
  },
];

RoomEquipment.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(RoomEquipment);
