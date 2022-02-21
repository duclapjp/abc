import React, { memo } from "react";
import { Collapse } from "antd";
import { Input, Form, Checkbox } from "formik-antd";
import { useIntl } from "react-intl";
import styled from "styled-components";
import IntlMessages from "@iso/components/utility/intlMessages";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const { Panel } = Collapse;

const InformationServices = ({ name, disable, index }) => {
  const { messages } = useIntl();
  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.jaran.informationServices.title"]}
        subTitles={[
          messages[
            "page.taskAddEdit.jaran.informationServices.sub.additionalInformationSV"
          ],
          messages["page.taskAddEdit.jaran.informationServices.sub.plansWithMeals"],
          messages["page.taskAddEdit.jaran.informationServices.sub.check"],
        ]}
        index={index}
      />
      <ColRight>
        <CollapseCustom
          bordered={false}
          defaultActiveKey={["1"]}
          style={{ background: "transparent" }}
        >
          <Panel
            header={
              messages["page.taskAddEdit.jaran.informationServices.panel.breakfast"]
            }
            key="1"
          >
            <Checkbox.Group
              disabled={disable}
              name={`${name}.breakfast`}
              options={breakfast}
            />
          </Panel>
          <Panel
            header={
              messages["page.taskAddEdit.jaran.informationServices.panel.dinner"]
            }
            key="2"
          >
            <Checkbox.Group
              disabled={disable}
              name={`${name}.dinner`}
              options={dinner}
            />
          </Panel>
          <Panel
            header={
              messages[
                "page.taskAddEdit.jaran.informationServices.panel.mainIngredients"
              ]
            }
            key="3"
          >
            <Checkbox.Group
              disabled={disable}
              name={`${name}.mainIngredients`}
              options={mainIngredients}
            />
          </Panel>
          <Panel
            header={
              messages[
                "page.taskAddEdit.jaran.informationServices.panel.otherFeatures"
              ]
            }
            key="4"
          >
            <Checkbox.Group
              disabled={disable}
              name={`${name}.otherFeatures.otherFeatures`}
              options={otherFeatures}
            />
            <Item
              name={`${name}.otherFeatures.freeWord`}
              label={
                messages["page.taskAddEdit.jaran.informationServices.input.title"]
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.TextArea
                disabled={disable}
                name={`${name}.otherFeatures.freeWord`}
                rows={4}
                placeholder={
                  messages[
                    "page.taskAddEdit.jaran.informationServices.input.placeholder"
                  ]
                }
              />
            </Item>
          </Panel>
          <Panel
            header={
              messages[
                "page.taskAddEdit.jaran.informationServices.panel.acceptanceConditions"
              ]
            }
            key="5"
          >
            <Checkbox.Group
              disabled={disable}
              name={`${name}.acceptanceConditions.acceptanceConditions`}
              options={acceptanceConditions}
            />
            <Item
              name={`${name}.acceptanceConditions.freeWord`}
              label={
                messages["page.taskAddEdit.jaran.informationServices.input.title"]
              }
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.TextArea
                disabled={disable}
                name={`${name}.acceptanceConditions.freeWord`}
                rows={4}
                placeholder={
                  messages[
                    "page.taskAddEdit.jaran.informationServices.input.placeholder"
                  ]
                }
              />
            </Item>
          </Panel>
        </CollapseCustom>
      </ColRight>
    </PlanItemLayout>
  );
};

export const CollapseCustom = styled(Collapse)`
  &.ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    left: 0;
  }

  &.ant-collapse-borderless > .ant-collapse-item {
    border: none;
  }

  .column-content {
    flex-direction: column;
    display: flex;
  }

  .ant-form-item-label > label {
    color: rgba(0, 0, 0, 0.65);
  }
`;

export const Item = styled(Form.Item)`
  &.ant-form-item {
    margin-bottom: 0;
    padding-top: 15px;
  }
`;

const breakfast = [
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.japaneseFood" />
    ),
    value: "japaneseFood",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.westernFood" />
    ),
    value: "westernFood",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.chinese" />
    ),
    value: "chinese",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.viking" />
    ),
    value: "viking",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.lightMeal" />
    ),
    value: "lightMeal",
  },
];

const dinner = [
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.italian" />
    ),
    value: "italian",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.chinese" />
    ),
    value: "chinese",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.french" />
    ),
    value: "french",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.bbq" />
    ),
    value: "bbq",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.kaiseki" />
    ),
    value: "kaiseki",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.viking" />
    ),
    value: "viking",
  },
];

const mainIngredients = [
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.seafood" />
    ),
    value: "seafood",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.spinyLobster" />
    ),
    value: "spinyLobster",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.crab" />
    ),
    value: "crab",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.redSnapper" />
    ),
    value: "redSnapper",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.abalone" />
    ),
    value: "abalone",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.pufferFish" />
    ),
    value: "pufferFish",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.beef" />
    ),
    value: "beef",
  },
];

const otherFeatures = [
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.earlyBirdDiscount" />
    ),
    value: "earlyBirdDiscount",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.limitedTime" />
    ),
    value: "limitedTime",
  },
];

const acceptanceConditions = [
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.menOnly" />
    ),
    value: "menOnly",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.womenOnly" />
    ),
    value: "womenOnly",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.50YearsOrOlder" />
    ),
    value: "50YearsOrOlder",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.60YearsOrOlder" />
    ),
    value: "60YearsOrOlder",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.randomGuestRoom" />
    ),
    value: "randomGuestRoom",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.withoutCleaning" />
    ),
    value: "withoutCleaning",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.underRenovation/construction" />
    ),
    value: "construction",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.powerOutage" />
    ),
    value: "powerOutage",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.birthdayOnly" />
    ),
    value: "birthdayOnly",
  },
  {
    label: (
      <IntlMessages id="page.taskAddEdit.jaran.informationServices.checkbox.studentOnly" />
    ),
    value: "studentOnly",
  },
];

InformationServices.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(InformationServices);
