import React, { memo } from "react";
import { Input, FormItem } from "formik-antd";
import { Row, Col } from "antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";

import TimeSelectComponents from "@iso/components/CategoryPlan/BasicPlanInfo/TimeSelect";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";
const EndTime = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.endTime"]}
        index={index}
      />
      <ColRight>
        <Row>
          <Col xs={24} lg={24} xl={8}>
            <FormItem
              name={`${name}.beforeLive`}
              labelCol={{ xs: 24, xl: 7, xxl: 6 }}
              wrapperCol={{ xs: 24, xl: 17 }}
              label={
                messages["page.taskAddEdit.basicPlanInfo.placeholder.beforeLive"]
              }
            >
              <Input
                suffix={
                  messages[
                    "page.taskAddEdit.basicPlanInfo.placeholder.beforeLive.suffix"
                  ]
                }
                disabled={disable}
                name={`${name}.beforeLive`}
              />
            </FormItem>
          </Col>
          <Col xs={24} lg={24} xl={{ span: 8, offset: 2 }}>
            <TimeSelectComponents
              formItemName1={`${name}.endTime.hour`}
              formItemName2={`${name}.endTime.minute`}
              message={
                messages[
                  "page.taskAddEdit.basicPlanInfo.placeholder.beforeLive.time"
                ]
              }
              disable={disable}
            />
          </Col>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const hours = [];
for (let i = 1; i <= 29; i++) {
  hours.push(i);
}

EndTime.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(EndTime);
