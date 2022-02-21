import React, { memo } from "react";
import { DatePicker, FormItem } from "formik-antd";
import { Row, Col } from "antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";
import moment from "moment";
import { isEmpty } from "lodash";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { DATE_FORMAT, POST_TIME_FIELD_NAME } from "@iso/constants/common.constant";
import PropTypes from "prop-types";

const AvailableTime = ({
  name,
  // defaultValue = {},
  disable,
  setFieldValue,
  position,
  index,
}) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.availableTime"]}
        index={index}
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
                // disabledDate={(current) =>
                //   disabledDatePrev(current, defaultValue?.to)
                // }
                onChange={() =>
                  setFieldValue(
                    `${
                      position === "task" ? "items" : "items1"
                    }.${POST_TIME_FIELD_NAME}`,
                    {}
                  )
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
                // disabledDate={(current) => disabledDateTo({ current, defaultValue })}
                onChange={() =>
                  setFieldValue(
                    `${
                      position === "task" ? "items" : "items1"
                    }.${POST_TIME_FIELD_NAME}`,
                    {}
                  )
                }
              />
            </FormItem>
          </Col>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

export const disabledDateTo = ({ current, defaultValue }) => {
  const maxDate = !isEmpty(defaultValue.from)
    ? moment(defaultValue.from, DATE_FORMAT).endOf("day")
    : null;
  return current && maxDate && current < maxDate;
};

export const disabledDatePrev = (current, value) => {
  const maxDate = value
    ? moment(value, DATE_FORMAT).endOf("day").subtract(1, "days")
    : null;
  return current && maxDate && current > maxDate;
};

export const disabledDateInside = (current, start, end) => {
  let minDate = null,
    maxDate = null;
  if (start && end) {
    minDate = moment(start, DATE_FORMAT).endOf("day").subtract(1, "days");
    maxDate = moment(end, DATE_FORMAT).endOf("day").subtract(1, "days");
  }
  return current && maxDate && (current > maxDate || current < minDate);
};

AvailableTime.propTypes = {
  name: PropsTypes.string,
  defaultValue: PropsTypes.object,
  categoryItems: PropsTypes.object,
  disable: PropsTypes.bool,
  setFieldValue: PropTypes.func,
  position: PropTypes.any,
  index: PropTypes.any,
};

export default memo(AvailableTime);
