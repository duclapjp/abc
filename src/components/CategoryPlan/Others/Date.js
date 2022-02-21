import React, { memo } from "react";
import { DatePicker, FormItem } from "formik-antd";
import { Row, Col } from "antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import {
  disabledDatePrev,
  disabledDateTo,
} from "@iso/components/CategoryPlan/BasicPlanInfo/AvailableTime";
import PropTypes from "prop-types";

const Date = ({ name, defaultValue = {}, disable, index, otas }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.other.date.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <Row>
          <Col xs={24} xl={8}>
            <FormItem
              name={`${name}.from`}
              label={messages["page.taskAddEdit.from"]}
              labelCol={{ span: 6 }}
            >
              <DatePicker
                disabled={disable}
                name={`${name}.from`}
                disabledDate={(current) =>
                  disabledDatePrev(current, defaultValue?.to)
                }
              />
            </FormItem>
          </Col>
          <Col xs={24} xl={{ span: 8, offset: 2 }}>
            <FormItem
              name={`${name}.to`}
              label={messages["page.taskAddEdit.to"]}
              labelCol={{ span: 6 }}
            >
              <DatePicker
                disabled={disable}
                name={`${name}.to`}
                disabledDate={(current) => disabledDateTo({ current, defaultValue })}
              />
            </FormItem>
          </Col>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

Date.propTypes = {
  name: PropsTypes.string,
  defaultValue: PropsTypes.object,
  disable: PropsTypes.bool,
  index: PropTypes.any,
  otas: PropTypes.any,
};

export default memo(Date);
