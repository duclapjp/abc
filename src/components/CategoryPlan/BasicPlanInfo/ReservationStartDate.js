import React, { memo } from "react";
import { Input, FormItem } from "formik-antd";
import { useIntl } from "react-intl";
import { Col, Row } from "antd";
import PropTypes from "prop-types";

import { PlanItemLayout, ColLeft, ColRight } from "../PlanItemLayout";
import TimeSelectComponents from "@iso/components/CategoryPlan/BasicPlanInfo/TimeSelect";

const ReservationStartDate = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.reservationStartDate"]}
        subTitles={[
          messages["page.taskAddEdit.basicPlanInfo.sub.reservationStartDate0"],
          messages["page.taskAddEdit.basicPlanInfo.sub.reservationStartDate1"],
        ]}
        index={index}
      />
      <ColRight>
        <Row gutter={[10, 10]}>
          <Col xs={24} lg={8}>
            <FormItem
              name={`${name}.reservationStartDate.date`}
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
                name={`${name}.reservationStartDate.date`}
              />
            </FormItem>
          </Col>
          <Col xs={24} lg={{ span: 12, offset: 2 }}>
            <TimeSelectComponents
              formItemName1={`${name}.reservationStartDate.hour`}
              formItemName2={`${name}.reservationStartDate.minute`}
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

ReservationStartDate.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(ReservationStartDate);
