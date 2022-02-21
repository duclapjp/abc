import React, { useMemo, memo, Fragment } from "react";
import PropTypes from "prop-types";
import { Row, Col, Tabs, Typography, Divider } from "antd";
import { useIntl } from "react-intl";
import { find, map, forEach, assign, filter, includes, difference } from "lodash";

import { colSingleLeft } from "@iso/assets/styles/form.style";
import CategoryMapping from "@iso/constants/category.mapping";
import { parseItemsDataToForm } from "@iso/containers/TaskAddAndEdit/utils";
import OTA_ITEM from "@iso/components/CategoryPlan/OTA/OTA_ITEM";
import TargetPlan from "@iso/components/CategoryPlan/Others/TargetPlan";
import {
  PlanItemLayout,
  ColLeft,
  ColRight,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { SelectCustom } from "@iso/components/CategoryPlan/OTA/OTA_ITEM";
import { otaNames } from "@iso/constants/common.constant";
import {
  OTA_FIELD_NAME,
  TARGET_PLAN_FIELD_NAME,
  PLANID_VISIBLE_TARGET_PLAN,
} from "@iso/constants/common.constant";

import { CategoryDetailWrapper } from "./CategoryDetail.style";

const renderItem = (
  items,
  name,
  setFieldValue,
  categoryItems,
  disable,
  isStore,
  canSelectPlan,
  otas,
  visible
) => {
  const listComponent = [];
  map(items, (item) => {
    const ChildComponent = CategoryMapping[item.itemCode];
    if (ChildComponent) {
      listComponent.push({ ChildComponent, properties: item });
    }
  });
  return (
    <>
      {map(listComponent, (item, index) => {
        return (
          <div key={index}>
            <item.ChildComponent
              name={`${name}.ITEMID${item.properties.itemId}`}
              setFieldValue={setFieldValue}
              defaultValue={categoryItems?.[`ITEMID${item.properties.itemId}`]}
              valueItems={categoryItems}
              disable={disable}
              isStore={isStore}
              canSelectPlan={canSelectPlan}
              otas={otas}
              position="task"
              visible={visible}
              index={index + 1}
            />
          </div>
        );
      })}
    </>
  );
};

const CategoryDetail = ({
  planDefaultList = [],
  categoryList = [],
  category,
  name,
  setFieldValue,
  isStore,
  storeId,
  categoryItems = {},
  disable,
  otas,
}) => {
  const { messages } = useIntl();

  const $otaNames = useMemo(() => difference(otaNames, otas), [otas]);

  const categoryData = useMemo(
    () => find(categoryList, (item) => item.planId === category),
    [categoryList, category]
  );

  const items = categoryData?.items || [];

  const tabItems = useMemo(() => {
    const obj = {};
    forEach(items, ({ tab }) => {
      tab &&
        !obj[tab] &&
        !includes($otaNames, tab) &&
        assign(obj, { [tab]: filter(items, { tab }) });
    });
    return obj;
  }, [items, $otaNames]);

  if (!categoryData?.canSelectPlan) {
    return (
      <CategoryDetailWrapper>
        <Row justify="end">
          {isStore && (
            <>
              <Col {...colSingleLeft}>
                <PlanItemLayout>
                  <ColLeft title={messages["page.taskAddEdit.defaultPlan"]} />
                  <ColRight>
                    <SelectCustom
                      name="defaultPlanId"
                      disabled={!categoryData?.canSelectPlan}
                    >
                      {map(planDefaultList, (select, index) => (
                        <SelectCustom.Option
                          key={index}
                          value={select.defaultPlanId}
                        >
                          {select.name}
                        </SelectCustom.Option>
                      ))}
                    </SelectCustom>
                  </ColRight>
                </PlanItemLayout>
              </Col>
              <Col {...colSingleLeft}>
                <OTA_ITEM
                  name={`${name}[${OTA_FIELD_NAME}]`}
                  isStore={isStore}
                  storeId={storeId}
                  disable={disable}
                />
                {includes(PLANID_VISIBLE_TARGET_PLAN, categoryData?.planId) && (
                  <TargetPlan
                    name={`${name}[${TARGET_PLAN_FIELD_NAME}]`}
                    disable={disable}
                  />
                )}
              </Col>
            </>
          )}
          <Col {...colSingleLeft}>
            {renderItem(
              items,
              name,
              setFieldValue,
              categoryItems,
              disable,
              isStore,
              null,
              otas,
              false
            )}
            {map(tabItems, (value, key) => {
              return (
                <Fragment key={key}>
                  <Typography.Title level={4}>
                    <Divider />
                    {messages[`page.taskAddEdit.categoryDetail.${key}`]}
                  </Typography.Title>
                  {renderItem(
                    value,
                    name,
                    setFieldValue,
                    categoryItems,
                    disable,
                    isStore,
                    null,
                    otas
                  )}
                </Fragment>
              );
            })}
          </Col>
        </Row>
      </CategoryDetailWrapper>
    );
  }

  return (
    <CategoryDetailWrapper>
      <Row justify="end">
        {isStore && (
          <>
            <Col {...colSingleLeft}>
              <PlanItemLayout>
                <ColLeft title={messages["page.taskAddEdit.defaultPlan"]} />
                <ColRight>
                  <SelectCustom
                    name="defaultPlanId"
                    disabled={!categoryData?.canSelectPlan || disable}
                    onChange={(value) => {
                      const { items } = find(planDefaultList, { planId: value });
                      setFieldValue(name, parseItemsDataToForm(items));
                    }}
                  >
                    {planDefaultList.map((select, index) => (
                      <SelectCustom.Option key={index} value={select.planId}>
                        {select.name}
                      </SelectCustom.Option>
                    ))}
                  </SelectCustom>
                </ColRight>
              </PlanItemLayout>
            </Col>
            <Col {...colSingleLeft}>
              <OTA_ITEM
                name={`${name}[${OTA_FIELD_NAME}]`}
                isStore={isStore}
                disable={disable}
              />
              {includes(PLANID_VISIBLE_TARGET_PLAN, categoryData?.planId) && (
                <TargetPlan
                  name={`${name}[${TARGET_PLAN_FIELD_NAME}]`}
                  disable={disable}
                />
              )}
            </Col>
          </>
        )}
        <Col {...colSingleLeft}>
          <Tabs type="card" size="default">
            {map(tabItems, (value, key) => {
              return (
                key !== "OTHER_TAB" && (
                  <Tabs.TabPane
                    tab={messages[`page.taskAddEdit.categoryDetail.${key}`]}
                    key={key}
                  >
                    {renderItem(
                      value,
                      name,
                      setFieldValue,
                      categoryItems,
                      disable,
                      isStore,
                      categoryData.canSelectPlan
                    )}
                  </Tabs.TabPane>
                )
              );
            })}
            <Tabs.TabPane
              tab={messages[`page.taskAddEdit.categoryDetail.OTHER_TAB`]}
              key={"OTHER_TAB"}
            >
              {renderItem(
                tabItems["OTHER_TAB"],
                name,
                setFieldValue,
                categoryItems,
                disable,
                isStore,
                categoryData.canSelectPlan
              )}
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </CategoryDetailWrapper>
  );
};

CategoryDetail.propTypes = {
  planDefaultList: PropTypes.array,
  categoryList: PropTypes.array,
  category: PropTypes.number,
  name: PropTypes.string,
  setFieldValue: PropTypes.any,
  isStore: PropTypes.bool,
  categoryItems: PropTypes.object,
  disable: PropTypes.bool,
  otas: PropTypes.any,
  storeId: PropTypes.any,
};

export default memo(CategoryDetail);
