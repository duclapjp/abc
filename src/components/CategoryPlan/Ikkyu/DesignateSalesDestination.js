import React, { memo } from "react";
import { Checkbox } from "formik-antd";
import { useIntl } from "react-intl";
import IntlMessages from "@iso/components/utility/intlMessages";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import styled from "styled-components";

const DesignateSalesDestination = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.ikkyu.designateSalesDestination.title"]}
        index={index}
      />
      <ColRight>
        <CheckboxGroupVertical disabled={disable} name={`${name}.installationFee`}>
          {RADIO_OPTIONS.map((item, index) => (
            <Checkbox key={index} value={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </CheckboxGroupVertical>
      </ColRight>
    </PlanItemLayout>
  );
};

const RADIO_OPTIONS = [
  {
    value: "normal",
    label: (
      <IntlMessages id="page.taskAddEdit.ikkyu.designateSalesDestination.radio.normal" />
    ),
  },
  {
    value: "inboundOnly",
    label: (
      <IntlMessages id="page.taskAddEdit.ikkyu.designateSalesDestination.radio.inboundOnly" />
    ),
  },
  {
    value: "yahooPack",
    label: (
      <IntlMessages id="page.taskAddEdit.ikkyu.designateSalesDestination.radio.yahooPack" />
    ),
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

DesignateSalesDestination.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(DesignateSalesDestination);
