import React, { memo } from "react";
import { Input, Checkbox } from "formik-antd";
import { useIntl } from "react-intl";
import IntlMessages from "@iso/components/utility/intlMessages";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { Item } from "@iso/components/CategoryPlan/Jaran/InformationServices";
import styled from "styled-components";

const InboundSales = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rakuten.inboundSales.title"]}
        index={index}
      />
      <ColRight>
        <CheckboxGroupVertical disabled={disable} name={`${name}.inboundSales`}>
          {RADIO_OPTIONS.map((item, index) => (
            <Checkbox key={index} value={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </CheckboxGroupVertical>
        <Item
          name={`${name}.planName`}
          label={messages["page.taskAddEdit.rakuten.inboundSales.input.planName"]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea disabled={disable} name={`${name}.planName`} rows={4} />
        </Item>
        <Item
          name={`${name}.planContent`}
          label={messages["page.taskAddEdit.rakuten.inboundSales.input.planContent"]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea disabled={disable} name={`${name}.planContent`} rows={4} />
        </Item>
      </ColRight>
    </PlanItemLayout>
  );
};

const RADIO_OPTIONS = [
  {
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.InboundSalesSell" />
    ),
    value: "sell",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.standardPlan" />
    ),
    value: "standardPlan",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.noMealPlan" />
    ),
    value: "noMealPlan",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.planWithBreakfast" />
    ),
    value: "planWithBreakfast",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.halfBoardPlan" />
    ),
    value: "halfBoardPlan",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.continuousNightPlan" />
    ),
    value: "continuousNightPlan",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.hotSpringEnjoymentPlan" />
    ),
    value: "hotSpringEnjoymentPlan",
  },
  {
    label: <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.skiPlan" />,
    value: "skiPlan",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.upgradePlan" />
    ),
    value: "upgradePlan",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.earlyBirdPlan" />
    ),
    value: "earlyBirdPlan",
  },
  {
    label: <IntlMessages id="page.taskAddEdit.rakuten.inboundSales.radio.other" />,
    value: "other",
  },
];

const CheckboxGroupVertical = styled(Checkbox.Group)`
  &.ant-checkbox-group {
    margin-bottom: 10px;
    .ant-checkbox-wrapper {
      display: block;
      height: 30px;
      line-height: 30px;
      margin-left: 0;
    }
  }
`;

InboundSales.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(InboundSales);
