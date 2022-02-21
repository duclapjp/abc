import React, { memo } from "react";
import { Col, Row } from "antd";
import PropsTypes from "prop-types";
import { useIntl } from "react-intl";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

import TimeSelectComponents from "@iso/components/CategoryPlan/BasicPlanInfo/TimeSelect";
import PropTypes from "prop-types";

const CheckIn = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.checkIn"]}
        index={index}
      />
      <ColRight>
        <Row>
          <Col xs={24} xl={8}>
            <TimeSelectComponents
              formItemName1={`${name}.from.hour`}
              formItemName2={`${name}.from.minute`}
              message={messages["page.taskAddEdit.from"]}
              disable={disable}
            />
          </Col>
          <Col xs={24} xl={{ span: 8, offset: 2 }}>
            <TimeSelectComponents
              formItemName1={`${name}.to.hour`}
              formItemName2={`${name}.to.minute`}
              message={messages["page.taskAddEdit.to"]}
              disable={disable}
            />
          </Col>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

CheckIn.propTypes = {
  name: PropsTypes.string,
  defaultValue: PropsTypes.object,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(CheckIn);
