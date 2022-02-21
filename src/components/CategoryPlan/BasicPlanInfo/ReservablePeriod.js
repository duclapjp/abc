import React, { memo } from "react";
import { DatePicker, FormItem } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { AVAILABLE_FIELD_NAME } from "@iso/constants/common.constant";

// import { disabledDatePrev, disabledDateInside } from "./AvailableTime";

const ReservablePeriod = ({
  name,
  // defaultValue = {},
  disable,
  valueItems = {},
  index,
  otas,
}) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.ReservablePeriod"]}
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
                disabled={
                  disable ||
                  !valueItems[AVAILABLE_FIELD_NAME]?.from ||
                  !valueItems[AVAILABLE_FIELD_NAME]?.to
                }
                name={`${name}.from`}
                // disabledDate={(current) =>
                //   disabledDatePrev(current, valueItems[AVAILABLE_FIELD_NAME]?.from)
                // }
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
                disabled={
                  disable ||
                  !valueItems[AVAILABLE_FIELD_NAME]?.from ||
                  !valueItems[AVAILABLE_FIELD_NAME]?.to
                }
                name={`${name}.to`}
                // disabledDate={(current) =>
                //   disabledDateInside(
                //     current,
                //     defaultValue?.from,
                //     valueItems[AVAILABLE_FIELD_NAME]?.from
                //   )
                // }
              />
            </FormItem>
          </Col>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

ReservablePeriod.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.object,
  valueItems: PropTypes.object,
  disable: PropTypes.bool,
  index: PropTypes.any,
  otas: PropTypes.any,
};

export default memo(ReservablePeriod);
