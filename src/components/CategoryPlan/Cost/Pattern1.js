import React, { memo } from "react";
import { Button, Col, Row } from "antd";
import { Checkbox, Form, Input } from "formik-antd";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { get, isEmpty } from "lodash";

import Pattern1Style from "../Pattern.styles";
import taskActions from "@iso/redux/taskAddEdit/actions";

import {
  colFull,
  ColLeft,
  colPatternLeft,
  colPatternRight,
  ColRight,
  itemFullLabel,
  PlanItemLayout,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import PriceChildren from "./CostComponent/PriceForChildren";
import CancellationPolicy from "./CostComponent/CancellationPolicy";
import AmountGroupSelect from "../AmountGroupSelect/AmountGroupSelect";
import planAmountActions from "@iso/redux/planAmount/actions";

const Pattern1 = ({ name, setFieldValue, disable, defaultValue = {} }) => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  let data = get(defaultValue, "pattern1.amountGroupSelects");
  const { taskMode } = useSelector((state) => state.TaskAddEdit);

  const openAmountGroupData = () => {
    dispatch(taskActions.toggleAmountGroupSelect());
    dispatch(planAmountActions.getAmountGroupData());
  };

  const onChange = (e) => {
    const amountGroupId = e.target.value;
    const newData = data.filter((itemX) => itemX.amountGroupId !== amountGroupId);
    setFieldValue(`${name}.amountGroupSelects`, newData);
  };

  const renderAmountGroup = () => {
    let xhtml = null;
    if (!taskMode && !isEmpty(data)) {
      xhtml = data.map((item, index) => {
        return (
          <Col key={index} span={8}>
            <Checkbox
              onChange={onChange}
              value={item.amountGroupId}
              className={"ant-checkbox-checked"}
            >
              {item.amountGroupName}
            </Checkbox>
          </Col>
        );
      });
    }
    return xhtml;
  };

  return (
    <>
      <PlanItemLayout>
        <ColLeft title={messages["page.TemPlate.titlePriceDefault"]} />
        <ColRight>
          <Pattern1Style>
            <Row gutter={[0, 18]}>
              <Col {...colFull}>
                <Row gutter={[16, 0]}>
                  <Col {...colPatternLeft}>
                    <Button
                      disabled={disable}
                      onClick={openAmountGroupData}
                      type={"primary"}
                    >
                      {messages["page.TemPlate.openGroupAmount"]}
                    </Button>
                  </Col>
                  <Col {...colPatternRight}>
                    <Checkbox.Group
                      style={{ width: "100%" }}
                      name={`${name}.pattern1.amountGroupSelects`}
                    >
                      <Row>{renderAmountGroup()}</Row>
                    </Checkbox.Group>
                  </Col>
                </Row>
              </Col>
              <Col {...colFull}>
                <Form.Item
                  label={messages["page.TemPlate.setMoney"]}
                  {...itemFullLabel}
                  name={`${name}.note`}
                >
                  <Input.TextArea
                    disabled={disable}
                    rows={4}
                    name={`${name}.note`}
                  />
                </Form.Item>
              </Col>
            </Row>
            <AmountGroupSelect
              defaultValue={defaultValue}
              name={name}
              setFieldValue={setFieldValue}
            />
          </Pattern1Style>
        </ColRight>
      </PlanItemLayout>
      <PriceChildren name={name} disable={disable} />
      <CancellationPolicy name={name} disable={disable} />
    </>
  );
};

Pattern1.propTypes = {
  name: PropTypes.string,
  setFieldValue: PropTypes.any,
  disable: PropTypes.bool,
  defaultValue: PropTypes.object,
};
export default memo(Pattern1);
