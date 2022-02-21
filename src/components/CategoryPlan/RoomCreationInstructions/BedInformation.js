import React, { memo } from "react";
import { useIntl } from "react-intl";
import { Row, Col } from "antd";
import { Input } from "formik-antd";
import PropsTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PropTypes from "prop-types";

const BedInformation = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={
          messages["page.taskAddEdit.roomCreationInstructions.bedInformation.title"]
        }
        index={index}
      />
      <ColRight>
        <Row gutter={[15, 15]}>
          <Col xs={24} xl={4}>
            <Input
              prefix="幅"
              suffix="cm"
              name={`${name}.width`}
              disabled={disable}
            />
          </Col>
          <Col xs={24} xl={4}>
            <Input
              prefix="長さ"
              suffix="cm"
              name={`${name}.length`}
              disabled={disable}
            />
          </Col>
          <Col xs={24} xl={4}>
            <Input
              prefix="高さ"
              suffix="cm"
              name={`${name}.height`}
              disabled={disable}
            />
          </Col>
          <Col xs={24} xl={4}>
            <Input suffix="人用" name={`${name}.people`} disabled={disable} />
          </Col>
          <Col xs={24} xl={4}>
            <Input suffix="台" name={`${name}.amountBed`} disabled={disable} />
          </Col>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

BedInformation.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  index: PropTypes.any,
};

export default memo(BedInformation);
