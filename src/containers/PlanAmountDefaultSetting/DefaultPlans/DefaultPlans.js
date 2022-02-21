import React, { useState, useEffect, useCallback } from "react";
import { Formik } from "formik";
import { Form, ResetButton, SubmitButton } from "formik-antd";
import { Row, Col, Space, Button, Divider, message } from "antd";
import { useIntl } from "react-intl";
import { useHistory, useRouteMatch } from "react-router-dom";
import { includes, split, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import planAmountActions from "@iso/redux/planAmount/actions";

import { DefaultPlansStyles } from "./DefaultPlans.styles";
import TablePlanAmount, { tableNames } from "../TablePlanAmount";

const DefaultPlans = () => {
  const [initialValues, setInitialValues] = useState(initialValuesDefault);
  const [currentRoute, setCurrentRoute] = useState("");
  const { defaultPlans, loadingDefaultPlan } = useSelector(
    (state) => state.PlanAmount
  );
  const { messages } = useIntl();
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (form) => {
      const plans = map(form.defaultPlans, ({ planId, status }) => ({
        planId,
        status,
      }));
      new Promise((resolve, reject) =>
        dispatch(planAmountActions.reOrderPlan({ plans, resolve, reject }))
      )
        .then(() => message.success(messages["page.AmountRank.updateSuccess"]))
        .catch(() => message.error(messages["page.AmountRank.updateError"]));
    },
    [dispatch, messages]
  );

  useEffect(() => {
    const path = includes(split(url, "/"), "default-plans")
      ? url
      : `${url}/default-plans`;
    setCurrentRoute(path);
  }, [history, url]);

  useEffect(() => {
    dispatch(planAmountActions.getDefaultPlans());
  }, [dispatch]);

  useEffect(() => {
    setInitialValues({ defaultPlans: defaultPlans.rows });
  }, [defaultPlans.rows]);

  return (
    <DefaultPlansStyles>
      <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, dirty }) => (
          <Form>
            <Divider orientation="left">
              {messages["page.planAmountDefaultSetting.tab.defaultPlans"]}
            </Divider>

            <Row justify="end" className="mb-15">
              <Col>
                <Button
                  className="button btn-add"
                  onClick={() => history.push(`${currentRoute}/new`)}
                >
                  {messages["page.Account.buttonAdd"]}
                </Button>
              </Col>
            </Row>

            <TablePlanAmount
              name={tableNames.defaultPlans}
              dataSource={values[tableNames.defaultPlans]}
              url={currentRoute}
              loading={loadingDefaultPlan}
            />

            <Row justify="end" className="mt-15">
              <Space size={5}>
                <ResetButton type="default" disabled={!dirty || loadingDefaultPlan}>
                  {messages["page.Account.buttonCancel"]}
                </ResetButton>
                <SubmitButton disabled={!dirty || loadingDefaultPlan}>
                  {messages["page.chains.save"]}
                </SubmitButton>
              </Space>
            </Row>
          </Form>
        )}
      </Formik>
    </DefaultPlansStyles>
  );
};

const initialValuesDefault = {
  defaultPlans: [],
};

export default DefaultPlans;
