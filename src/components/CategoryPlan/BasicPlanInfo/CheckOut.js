import React, { memo } from "react";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";
import { Col } from "antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import TimeSelectComponents from "@iso/components/CategoryPlan/BasicPlanInfo/TimeSelect";
import PropTypes from "prop-types";

const CheckOut = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.checkOut"]}
        index={index}
      />
      <ColRight>
        <Col xs={24} xl={8} lg={24}>
          <TimeSelectComponents
            formItemName1={`${name}.checkOut.hour`}
            formItemName2={`${name}.checkOut.minute`}
            disable={disable}
          />
        </Col>
      </ColRight>
    </PlanItemLayout>
  );
};

CheckOut.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(CheckOut);
