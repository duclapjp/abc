import React, { memo } from "react";
import { InputNumber } from "formik-antd";
import { useIntl } from "react-intl";
import IntlMessages from "@iso/components/utility/intlMessages";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Input } from "antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { InputGroupCustom } from "@iso/components/CategoryPlan/Dairekutoin/RangeOfCharges";
import { ItemCustom } from "@iso/components/CategoryPlan/Jaran/BasicRoomProvided";
import { InputCharacter } from "@iso/components/CategoryPlan/Ikkyu/SleepingWithChildren";

const Bedding = ({ name, disable, otas = [], visible = true, index }) => {
  const { messages } = useIntl();

  if (!otas.includes("JARAN_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.jaran.bedding.title"]}
        index={index}
      />
      <ColRight>
        {BEDDING.map((item, idx) => (
          <ItemCustom
            key={idx}
            label={item.label}
            name={`${name}.${item.name}`}
            labelCol={{ lg: 5, md: 6, sm: 8 }}
            wrapperCol={{ lg: 19, md: 18, sm: 16 }}
          >
            <InputGroupCustom>
              <Input.Group className="input-group">
                <InputNumber
                  disabled={disable}
                  className="input-number-item"
                  name={`${name}.${item.name}`}
                  defaultValue={0}
                  min={0}
                />
                <InputCharacterCustom
                  placeholder={item.unit}
                  disabled
                  name="character"
                />
              </Input.Group>
            </InputGroupCustom>
          </ItemCustom>
        ))}
      </ColRight>
    </PlanItemLayout>
  );
};

const BEDDING = [
  {
    label: <IntlMessages id="page.taskAddEdit.jaran.bedding.item.singleBed" />,
    name: "singleBed",
    unit: "台",
  },
  {
    label: <IntlMessages id="page.taskAddEdit.jaran.bedding.item.queenBed" />,
    name: "queenBed",
    unit: "台",
  },
  {
    label: <IntlMessages id="page.taskAddEdit.jaran.bedding.item.extraBed" />,
    name: "extraBed",
    unit: "台",
  },
  {
    label: <IntlMessages id="page.taskAddEdit.jaran.bedding.item.doubleBed" />,
    name: "doubleBed",
    unit: "台",
  },
  {
    label: <IntlMessages id="page.taskAddEdit.jaran.bedding.item.kingBed" />,
    name: "kingBed",
    unit: "台",
  },
  {
    label: <IntlMessages id="page.taskAddEdit.jaran.bedding.item.futon" />,
    name: "futon",
    unit: "組",
  },
];

export const InputCharacterCustom = styled(InputCharacter)`
  &.ant-input[disabled] {
    width: 40px;
  }
`;

Bedding.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  visible: PropTypes.bool,
  otas: PropTypes.array,
  index: PropTypes.any,
};

export default memo(Bedding);
