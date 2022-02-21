import React, { memo } from "react";
import { Checkbox, Input, Form } from "formik-antd";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { Row, Col } from "antd";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const BathTax = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.basicPlanInfo.title.bathTax"]}
        index={index}
      />
      <ColRight>
        <RowCustom>
          <Checkbox disabled={disable} name={`${name}.bathTax`}>
            {messages["page.taskAddEdit.basicPlanInfo.checkbox.bathTax"]}
          </Checkbox>
        </RowCustom>
        <Row gutter={[10, 10]}>
          <Col xs={24} xl={5}>
            <Form.Item
              name={`${name}.adult`}
              label={messages["page.taskAddEdit.basicPlanInfo.placeholder.adult"]}
              labelCol={{ lg: 24 }}
              wrapperCol={{ lg: 24 }}
            >
              <Input disabled={disable} name={`${name}.adult`} />
            </Form.Item>
          </Col>
          <Col xs={24} xl={5}>
            <Form.Item
              name={`${name}.children`}
              label={messages["page.taskAddEdit.basicPlanInfo.placeholder.children"]}
              labelCol={{ lg: 24 }}
              wrapperCol={{ lg: 24 }}
            >
              <Input disabled={disable} name={`${name}.children`} />
            </Form.Item>
          </Col>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const RowCustom = styled(Row)`
  &.ant-row {
    margin-bottom: 10px;
  }
`;

BathTax.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(BathTax);
