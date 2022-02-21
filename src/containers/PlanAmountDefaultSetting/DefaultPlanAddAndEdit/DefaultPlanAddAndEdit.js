import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Divider, Button, Space, Modal } from "antd";
import { Formik } from "formik";
import { Form, Input, Radio, SubmitButton } from "formik-antd";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { isEmpty, pick } from "lodash";

import planAmountActions from "@iso/redux/planAmount/actions";
import Yup from "@iso/lib/helpers/validation";
import {
  OTA_STATUS,
  ITEM_CATEGORY_PLAN_IGNORE,
} from "@iso/constants/common.constant";
import {
  enhanceItemsData,
  parseItemsDataToForm,
} from "@iso/containers/TaskAddAndEdit/utils";

import DefaultCategoryDetail from "./DefaultCategoryDetail";
import { DefaultPlanAddAndEditStyles } from "./DefaultPlanAddAndEdit.styles";
import { Helmet } from "react-helmet";

const { Item } = Form;

const DefaultPlanAddAndEdit = () => {
  const [initialValues, setInitialValues] = useState(initialValuesDefault);
  const { defaultPlan, items, loadingDefaultPlan } = useSelector(
    (state) => state.PlanAmount
  );
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const { planId } = useParams();

  useEffect(() => {
    dispatch(planAmountActions.getTaskTemplates());
    planId && dispatch(planAmountActions.getDefaultPlan({ planId }));
  }, [dispatch, planId]);

  useEffect(() => {
    if (planId && !isEmpty(items)) {
      const yFilter = ITEM_CATEGORY_PLAN_IGNORE.map((itemY) => {
        return itemY;
      });
      setInitialValues({
        ...defaultPlan,
        items: items.filter((itemX) => !yFilter.includes(itemX.itemId)),
        items1: parseItemsDataToForm(defaultPlan.items),
      });
    } else {
      setInitialValues((prevState) => ({ ...prevState, items }));
    }
  }, [items, planId, defaultPlan]);

  const onSubmit = useCallback(
    (form, { setSubmitting, resetForm }) => {
      return new Promise((resolve, reject) => {
        const items = enhanceItemsData(form.items1);
        let payload = {
          resolve,
          reject,
          ...pick(form, ["name", "status"]),
          items,
        };

        if (!planId) {
          return dispatch(planAmountActions.createDefaultPlan(payload));
        } else {
          payload = { ...payload, planId };
          return dispatch(planAmountActions.updateDefaultPlan(payload));
        }
      })
        .then(() => {
          let content;
          if (!planId) {
            resetForm();
            content = messages[`page.planAmountDefaultAddEdit.createSuccess`];
          } else {
            dispatch(planAmountActions.getDefaultPlan({ planId }));
            content = messages[`page.planAmountDefaultAddEdit.updateSuccess`];
          }
          Modal.success({
            title: messages["page.storeAddEditEmail.modal.success"],
            content,
          });
        })
        .catch(() => {
          let content;
          if (!planId) {
            content = messages["page.planAmountDefaultAddEdit.createError"];
          } else {
            content = messages["page.planAmountDefaultAddEdit.updateError"];
          }
          Modal.error({
            title: messages["page.storeAddEditEmail.modal.error"],
            content,
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [dispatch, planId, messages]
  );

  return (
    <DefaultPlanAddAndEditStyles>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {planId
            ? `[プラン${planId}] ${initialValues.name} | ${messages["page.planAmountDefaultAddEdit.title"]} | HLS`
            : `${messages["page.planAmountDefaultAddEdit.title"]} | HLS`}
        </title>
      </Helmet>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema(messages)}
        enableReinitialize
      >
        {({ values, errors, dirty, isSubmitting, setFieldValue }) => {
          return (
            <Form colon={false} {...formLayout}>
              <Divider orientation="left">
                {messages["page.planAmountDefaultAddEdit.title"]}
              </Divider>
              <Row justify="center">
                <Col xs={22} md={18} lg={14}>
                  <Item
                    name="name"
                    label={messages["page.planAmountDefaults.th.templatePlanName"]}
                    required
                  >
                    <Input name="name" disabled={isSubmitting} />
                  </Item>
                  <Item name="status" label={messages["page.Account.status"]}>
                    <Radio.Group
                      name="status"
                      defaultValue={OTA_STATUS.ENABLED}
                      disabled={isSubmitting}
                    >
                      <Radio name="status" value={OTA_STATUS.ENABLED}>
                        {messages["page.AmountGroup.valid"]}
                      </Radio>
                      <Radio name="status" value={OTA_STATUS.DISABLED}>
                        {messages["page.AmountGroup.inValid"]}
                      </Radio>
                    </Radio.Group>
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DefaultCategoryDetail
                    name="items1"
                    items={values.items}
                    items1={values.items1}
                    loading={loadingDefaultPlan}
                    setFieldValue={setFieldValue}
                  />
                </Col>
              </Row>
              <Row justify="end" className="group-button">
                <Space size={5}>
                  <Button onClick={() => history.goBack()}>
                    {messages["page.btn.back"]}
                  </Button>
                  <SubmitButton disabled={!dirty || !isEmpty(errors)}>
                    {messages["page.Account.buttonSave"]}
                  </SubmitButton>
                </Space>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </DefaultPlanAddAndEditStyles>
  );
};

const initialValuesDefault = {
  name: "",
  status: OTA_STATUS.ENABLED,
  items: [],
};

const validationSchema = (messages) =>
  Yup.object().shape({
    name: Yup.string()
      .required()
      .label(messages["page.planAmountDefaults.th.templatePlanName"]),
  });

const formLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
  labelAlign: "left",
};

export default DefaultPlanAddAndEdit;
