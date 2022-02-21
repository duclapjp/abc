import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Divider, message, Row, Space } from "antd";
import { ResetButton, SubmitButton } from "formik-antd";
import { useIntl } from "react-intl";
import {
  GANTT_CHART_DATE_FORMAT,
  TIMEZONE_JAPAN,
} from "@iso/constants/common.constant";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, map, pick } from "lodash";

import planAmountActions from "@iso/redux/planAmount/actions";
import { AmountRankStyles } from "./AmountRank.styles";
import TablePlanAmount, { tableNames } from "../TablePlanAmount";
import validationSchema from "@iso/containers/PlanAmountDefaultSetting/AmountRank/validation.schema";

const AmountRank = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(initialValueDefault);
  const {
    Auth: {
      user: { displayName },
    },
    PlanAmount: { amountRank, loading },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(planAmountActions.getAmountRankData());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(amountRank)) {
      setInitialValues(amountRank);
    }
  }, [amountRank]);

  const onSubmit = useCallback(
    (data, form) => {
      const newData = map(data.amountRanks, (item, idx) => {
        return {
          ...(item.new
            ? pick(item, ["amountRankName", "enable"])
            : pick(item, ["amountRankId", "amountRankName", "enable"])),
          amountRankNo: idx + 1,
        };
      });
      new Promise((resolve, reject) =>
        dispatch(
          planAmountActions.updateAmountRank({ data: newData, resolve, reject })
        )
      )
        .then(() => {
          message.success(messages["page.AmountRank.updateSuccess"]);
          form.setSubmitting(false);
        })
        .catch(() => {
          message.error(messages["page.AmountRank.updateError"]);
          form.setSubmitting(false);
        });
    },
    [dispatch, messages]
  );

  return (
    <AmountRankStyles>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema(messages)}
        render={({ values, dirty, isSubmitting }) => (
          <Form>
            <Divider orientation="left">
              {messages["page.planAmountDefaultSetting.tab.amountRank"]}
            </Divider>
            <TablePlanAmount
              loading={loading}
              name={tableNames.amountRanks}
              dataSource={values[tableNames.amountRanks]}
              initPlanAmount={{
                ...initialDefaultRanks,
                displayName: displayName,
              }}
            />
            <Row justify="end" style={{ marginTop: 24 }}>
              <Space align="end">
                <ResetButton type="default" disabled={!dirty || isSubmitting}>
                  {messages["page.btn.cancel"]}
                </ResetButton>
                <SubmitButton disabled={!dirty || isSubmitting}>
                  {messages["page.btn.save"]}
                </SubmitButton>
              </Space>
            </Row>
          </Form>
        )}
      />
    </AmountRankStyles>
  );
};

const initialValueDefault = {
  amountRanks: [],
};

const now = moment().tz(TIMEZONE_JAPAN).format(GANTT_CHART_DATE_FORMAT);

const initialDefaultRanks = {
  amountRankId: "",
  amountRankNo: 0,
  amountRankName: "",
  enable: true,
  createdDate: now,
  updatedTime: "-",
  displayName: "",
  new: true,
};

export default AmountRank;
