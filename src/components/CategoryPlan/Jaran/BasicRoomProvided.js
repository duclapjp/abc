import React, { memo } from "react";
import { DatePicker, FormItem, InputNumber } from "formik-antd";
import { useIntl } from "react-intl";
import PropsTypes from "prop-types";
import styled from "styled-components";
import { Col, Row } from "antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { Item } from "@iso/components/CategoryPlan/BasicPlanInfo/RoomUse";
import {
  disabledDateTo,
  disabledDatePrev,
} from "@iso/components/CategoryPlan/BasicPlanInfo/AvailableTime";
import PropTypes from "prop-types";

const BasicRoomProvided = ({
  name,
  defaultValue = {},
  disable,
  otas = [],
  visible = true,
  index,
}) => {
  const { messages } = useIntl();

  if (!otas.includes("JARAN_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicRoomProvided.title"]}
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
        <Row gutter={[15, 15]}>
          <Col span={24}>
            {messages["page.taskAddEdit.basicRoomProvided.stockNumber"]}
          </Col>
          {DAY.map((item, idx) => (
            <Col key={idx} xs={24} xl={6}>
              <InputNumber
                disabled={disable}
                name={`${name}.stockNumber.${item.name}`}
                min={0}
                formatter={(value) =>
                  `${item.value} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Col>
          ))}
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const DAY = [
  { name: "mon", value: "日" },
  { name: "tue", value: "月" },
  { name: "wed", value: "火" },
  { name: "thu", value: "水" },
  { name: "fir", value: "木" },
  { name: "sat", value: "金" },
  { name: "sun", value: "土" },
];

export const ItemCustom = styled(Item)`
  &.ant-form-item {
    margin-bottom: 20px;
  }
`;

BasicRoomProvided.propTypes = {
  name: PropsTypes.string,
  defaultValue: PropsTypes.object,
  disable: PropsTypes.bool,
  visible: PropsTypes.bool,
  otas: PropsTypes.array,
  index: PropTypes.any,
};

export default memo(BasicRoomProvided);
