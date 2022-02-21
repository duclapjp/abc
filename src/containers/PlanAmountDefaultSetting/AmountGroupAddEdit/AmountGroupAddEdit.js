import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import { useIntl } from "react-intl";
import { Form, Input, InputNumber, Radio, SubmitButton } from "formik-antd";
import { Button, Col, Divider, Modal, Row, Space } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { isEmpty, pick, groupBy, forEach, has, get, filter } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import planAmountActions from "@iso/redux/planAmount/actions";
import { colFull, itemFullLabel } from "@iso/assets/styles/form.style";
import ModalConfirm from "@iso/components/Feedback/ModalConfirm";

import { AmountGroupsStyles } from "./AmountGroupAddEdit.styles";
import AmountGroupAddEditTable from "./AmountGroupAddEditTable";
import validationSchema from "./validation.schema";
import { columns } from "./data";
import { Helmet } from "react-helmet";

const AmountGroup = () => {
  const { messages } = useIntl();
  const { amountId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState(initialValuesDefault);
  const [amountPeople, setAmountPeople] = useState(defaultCapacity);
  const [editorMode, setEditorMode] = useState(false);

  const {
    PlanAmount: { amountGroup, amountRank, loading, numberPeople },
  } = useSelector((state) => state);

  const editing = editorMode || !amountId;
  const addAndDetail = !amountId || (amountId && !editorMode);
  const addAndEdit = !amountId || (amountId && editorMode);

  useEffect(() => {
    if (amountId) {
      dispatch(planAmountActions.getAmountItemEdit({ id: amountId }));
    }
    dispatch(planAmountActions.getAmountRankData());
  }, [amountId, dispatch]);

  useEffect(() => {
    if (amountId) {
      if (editorMode) {
        if (!isEmpty(amountGroup)) {
          const amountForm = groupBy(amountGroup.amountGroupRanks, "amountRankId");
          const amountRanks = get(amountRank, "amountRanks");
          forEach(amountRanks, (item) => {
            if (!has(amountForm, item["amountRankId"])) {
              item.amounts = dataRankMapped;
            } else {
              const amount = get(amountForm, `${item.amountRankId}[0].amounts`);
              for (let i = numberPeople; i < maxPeople; i++) {
                amount.push(0);
              }
              item.amounts = amount;
            }
          });
          const amountGroupRanks = filter(amountRanks, (item) => item.enable);
          setInitialValues({ ...amountGroup, amountGroupRanks: amountGroupRanks });
          setAmountPeople(numberPeople);
        }
      } else {
        setInitialValues(amountGroup);
        setAmountPeople(numberPeople);
      }
    } else {
      const rankData = amountRank.amountRanks;
      if (!isEmpty(rankData)) {
        const newRanks = rankData.filter((item) => item.enable);
        const newMounts = newRanks.map((item) => ({
          amountRankId: item.amountRankId,
          amountRankName: item.amountRankName,
          amounts: dataRankMapped,
        }));
        setInitialValues((prevState) => ({
          ...prevState,
          amountGroupRanks: newMounts,
        }));
      }
    }
  }, [
    amountId,
    amountGroup,
    amountRank.amountRanks,
    numberPeople,
    amountRank,
    editing,
    editorMode,
  ]);

  const onChangeInput = ({ value, setFieldValue }) => {
    if (typeof value === "number") {
      setFieldValue("totalPeople", value);
    }
  };

  const getNewData = useCallback(
    (data) => {
      const arr = [];
      for (let i = 0; i < amountPeople; i++) {
        arr.push(`amounts[${i}]`);
      }
      const newMount = [];
      for (let i = 0; i < data.amountGroupRanks.length; i++) {
        const amounts = pick(data.amountGroupRanks[i], [...arr]);
        const amountItem = { ...data.amountGroupRanks[i], ...amounts };
        newMount.push(amountItem);
      }
      if (amountId) {
        return {
          ...data,
          amountGroupRanks: newMount,
        };
      } else {
        return {
          amountGroupName: data.amountGroupName,
          totalPeople: data.totalPeople,
          enable: data.enable,
          amountGroupRanks: newMount,
        };
      }
    },
    [amountId, amountPeople]
  );

  const onSubmit = useCallback(
    (data, form) => {
      let newAmountForm = getNewData(data);
      const newData = { ...newAmountForm, totalPeople: amountPeople };
      new Promise((resolve, reject) => {
        dispatch(
          planAmountActions.addEditAmountGroup({ data: newData, resolve, reject })
        );
        if (!amountId) {
          setAmountPeople(defaultCapacity);
        }
      })
        .then(() => {
          if (!amountId) {
            Modal.success({
              title: messages["page.Account.modal.success"],
              content: <div>{messages["page.AmountGroup.createSuccess"]}</div>,
            });
            form.resetForm();
            form.setSubmitting(false);
          } else {
            Modal.success({
              title: messages["page.Account.modal.success"],
              content: <div>{messages["page.AmountGroup.updateSuccess"]}</div>,
            });
            form.resetForm();
            setEditorMode(false);
            form.setSubmitting(false);
          }
        })
        .catch(() => {
          const content = amountId ? (
            <div>{messages["page.AmountGroup.updateError"]}</div>
          ) : (
            <div>{messages["page.AmountGroup.createError"]}</div>
          );
          Modal.error({
            title: messages["page.Account.modal.error"],
            content: content,
          });
          form.setSubmitting(false);
        });
    },
    [amountId, amountPeople, dispatch, getNewData, messages]
  );

  return (
    <AmountGroupsStyles>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {amountId
            ? `[料金グループ${amountId}] ${initialValues.amountGroupName} | ${messages["page.AmountGroup.AmountGroupAddEdit.title"]} || HLS`
            : `${messages["page.AmountGroup.AmountGroupAddEdit.title"]} | HLS`}
        </title>
      </Helmet>
      <Divider orientation="left">
        {messages["page.AmountGroup.AmountGroupAddEdit.title"]}
      </Divider>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema(messages)}
      >
        {({ dirty, values, setFieldValue, resetForm, isSubmitting }) => {
          return (
            <Form colon={false} className="mb-5 hls-form" labelAlign="left">
              <Row justify={"center"}>
                <Col sm={18}>
                  <Row>
                    <Col {...colFull}>
                      <Form.Item
                        {...itemFullLabel}
                        label={messages["page.AmountGroup.groupName"]}
                        name="amountGroupName"
                        required
                      >
                        <Input
                          disabled={!editing || isSubmitting}
                          name="amountGroupName"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col {...colFull}>
                      <Form.Item
                        {...itemFullLabel}
                        label={messages["page.AmountGroup.Effectiveness"]}
                        name="enable"
                      >
                        <Radio.Group
                          name={"enable"}
                          disabled={!editing || isSubmitting}
                        >
                          <Radio name={"enable"} value={true}>
                            {messages["page.AmountGroup.valid"]}
                          </Radio>
                          <Radio name={"enable"} value={false}>
                            {messages["page.AmountGroup.inValid"]}
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="mb-10">
                    <Col {...colLeft}>
                      <Form.Item
                        {...itemLeftLabel}
                        name="totalPeople"
                        label={messages["page.AmountGroup.capacity"]}
                      >
                        <InputNumber
                          disabled={!editing || isSubmitting}
                          className="button"
                          name="totalPeople"
                          min={1}
                          max={10}
                          defaultValue={1}
                          value={values.totalPeople}
                          onChange={(value) =>
                            onChangeInput({ value, setFieldValue })
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col {...colRight}>
                      <Button
                        onClick={() => setAmountPeople(values.totalPeople)}
                        type="primary"
                        className="button"
                        disabled={typeof values.totalPeople !== "number" || !dirty}
                      >
                        {messages["page.AmountGroup.changeCapacity"]}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <AmountGroupAddEditTable
                messages={messages}
                amount={values.amountGroupRanks}
                columns={columns({
                  messages,
                  tableName,
                  length: amountPeople,
                  editing,
                  isSubmitting,
                })}
                loading={loading}
              />
              <Row justify="end" className={"mt-20"}>
                <Space size={5}>
                  {dirty ? (
                    <ModalConfirm
                      content={messages["page.AmountGroup.modalContent"]}
                      onOk={() => {
                        setAmountPeople(amountId ? numberPeople : defaultCapacity);
                        resetForm();
                      }}
                    >
                      <Button disabled={isSubmitting}>
                        {messages["page.btn.resetField"]}
                      </Button>
                    </ModalConfirm>
                  ) : (
                    <Button
                      onClick={() => {
                        addAndDetail ? history.goBack() : setEditorMode(false);
                      }}
                    >
                      {messages[`page.btn.${addAndDetail ? "back" : "cancel"}`]}
                    </Button>
                  )}
                  {addAndEdit ? (
                    <SubmitButton disabled={!dirty || isSubmitting}>
                      {messages["page.Account.buttonSave"]}
                    </SubmitButton>
                  ) : (
                    <SubmitButton onClick={() => setEditorMode(true)}>
                      {messages["page.taskAddEdit.buttonEdit"]}
                    </SubmitButton>
                  )}
                </Space>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </AmountGroupsStyles>
  );
};

const dataRankMapped = [];
for (let i = 1; i < 11; i++) {
  dataRankMapped.push(0);
}

const colLeft = {
  xs: { span: 24, offset: 0 },
  lg: { span: 12, offset: 0 },
};

const colRight = {
  xs: { span: 24, offset: 0 },
  lg: { span: 8, offset: 4 },
};

const itemLeftLabel = {
  labelCol: { lg: 8, xs: 24 },
  wrapperCol: { lg: 16, xs: 24 },
};

const initialValuesDefault = {
  amountGroupName: "",
  enable: true,
  totalPeople: 1,
  amountGroupRanks: [],
};

const defaultCapacity = 1;

const maxPeople = process.env.REACT_APP_AMOUNT_GROUP_MAX_PEOPLE || 10;

const tableName = "amountGroupRanks";

export default AmountGroup;
