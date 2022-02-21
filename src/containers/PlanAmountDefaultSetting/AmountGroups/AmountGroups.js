/* eslint-disable react/display-name  */
import React, { useState, useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import { Row, Button, Space, Divider, Col, message } from "antd";
import { Formik } from "formik";
import { Form, SubmitButton, ResetButton } from "formik-antd";
import { useHistory, useRouteMatch } from "react-router-dom";

import AmountGroupsStyles from "./AmountGroups.styles";
import TablePlanAmount, {
  tableNames,
} from "@iso/containers/PlanAmountDefaultSetting/TablePlanAmount";

import { useSelector, useDispatch } from "react-redux";
import planAmountActions from "@iso/redux/planAmount/actions";

const AmountGroups = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  const {
    PlanAmount: { amountGroups, loading },
  } = useSelector((state) => state);

  const [initialValues, setInitialValues] = useState(initialValueDefault);

  useEffect(() => {
    dispatch(planAmountActions.getAmountGroupData());
  }, [dispatch]);

  useEffect(() => {
    setInitialValues(amountGroups);
  }, [amountGroups]);

  const onSubmit = useCallback(
    (data) => {
      new Promise((resolve, reject) =>
        dispatch(planAmountActions.updateAmountGroups({ data, resolve, reject }))
      )
        .then(() => message.success(messages["page.AmountRank.updateSuccess"]))
        .catch(() => message.error(messages["page.AmountRank.updateError"]));
    },
    [dispatch, messages]
  );

  return (
    <AmountGroupsStyles>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
        render={({ isSubmitting, dirty, values }) => (
          <Form colon={false} labelAlign="left" className="hls-form">
            <Divider orientation="left">
              {messages["page.planAmountDefaultSetting.tab.amountGroups"]}
            </Divider>
            <Row justify="end" className="mb-15">
              <Col>
                <Button
                  className="button btn-add"
                  onClick={() => history.push(`${url}/new`)}
                >
                  {messages["page.Account.buttonAdd"]}
                </Button>
              </Col>
            </Row>
            <TablePlanAmount
              name={tableNames.amountGroups}
              dataSource={values[tableNames.amountGroups]}
              url={url}
              loading={loading}
            />
            <Row justify="end" className="mt-15">
              <Space size={5}>
                <ResetButton type="default" disabled={!dirty || isSubmitting}>
                  {messages["page.Account.buttonCancel"]}
                </ResetButton>
                <SubmitButton type="primary" disabled={!dirty}>
                  {messages["page.Account.buttonSave"]}
                </SubmitButton>
              </Space>
            </Row>
          </Form>
        )}
      />
    </AmountGroupsStyles>
  );
};

const initialValueDefault = {
  amountGroups: [],
};

export default AmountGroups;
