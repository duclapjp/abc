import React, { useCallback, useEffect, useState, memo } from "react";
import { isEmpty } from "lodash";
import { useIntl } from "react-intl";
import { Row, Button, Col, Modal, Space } from "antd";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import LayoutContent from "@iso/components/utility/layoutContent";
import validationSchema from "./validation.chema";
import ChainAction from "@iso/redux/chainSetting/actions";
import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
} from "@iso/assets/styles/form.style";
import { Helmet } from "react-helmet";

const ChainSetting = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const [data, setData] = useState(initialValue);
  const { chainId } = useSelector((state) => state.Auth.user);
  const { chain } = useSelector((state) => state.ChainSetting);

  useEffect(() => {
    if (!isEmpty(chain)) {
      setData(chain);
    }
  }, [chain]);

  useEffect(() => {
    if (chainId) {
      dispatch(ChainAction.getChain(chainId));
    }
  }, [chainId, dispatch]);

  const onSubmit = useCallback(
    (data, form) => {
      const schema = validationSchema(messages);
      const dataTransform = schema.cast(data);
      new Promise((resolve, reject) => {
        dispatch(
          ChainAction.updateChain({ resolve, reject, chainId, data: dataTransform })
        );
      })
        .then(() => {
          Modal.success({
            title: messages["page.Account.Success"],
            content: messages["page.Chain.UpdateSuccess"],
            okText: messages["page.Account.Ok"],
            cancelText: messages["page.Account.Cancel"],
          });
          form.setSubmitting(false);
        })
        .catch(() => {
          Modal.error({
            title: messages["page.Account.Error"],
            content: messages["page.Chain.UpdateError"],
            okText: messages["page.Account.Ok"],
            cancelText: messages["page.Account.Cancel"],
          });
          form.setSubmitting(false);
        });
    },
    [dispatch, chainId, messages]
  );

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["sidebar.chainSetting"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["sidebar.chainSetting"]}</PageHeader>
      <LayoutContent>
        <Formik
          onSubmit={onSubmit}
          initialValues={data}
          enableReinitialize={true}
          validationSchema={validationSchema(messages)}
          render={({ isSubmitting, resetForm, dirty }) => (
            <Form name="basic" colon={false} labelAlign="left">
              <Row justify="end" style={{ marginBottom: 24 }}>
                <Space align="end">
                  <Button
                    onClick={() => resetForm()}
                    htmlType="button"
                    disabled={!dirty || isSubmitting}
                  >
                    {messages["page.Account.buttonCancel"]}
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                    disabled={!dirty}
                  >
                    {messages["page.Account.buttonSave"]}
                  </Button>
                </Space>
              </Row>
              <Row>
                <Col {...colLeft}>
                  <Form.Item
                    {...itemLeftLabel}
                    label={messages["page.Chain.Name"]}
                    name="name"
                    required
                  >
                    <Input name="name" />
                  </Form.Item>
                </Col>
                <Col {...colRight}>
                  <Form.Item
                    {...itemRightLabel}
                    label={messages["page.Chain.Contact"]}
                    name="managerName"
                  >
                    <Input name="managerName" />
                  </Form.Item>
                </Col>
                <Col {...colLeft}>
                  <Form.Item
                    {...itemLeftLabel}
                    label={messages["page.Chain.Phone"]}
                    name="managerPhone"
                  >
                    <Input name="managerPhone" />
                  </Form.Item>
                </Col>
                <Col {...colRight}>
                  <Form.Item
                    {...itemRightLabel}
                    label={messages["page.Chain.Mail"]}
                    name="managerMail"
                  >
                    <Input name="managerMail" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        />
      </LayoutContent>
    </LayoutWrapper>
  );
};

const initialValue = {
  name: "",
  managerPhone: "",
  managerName: "",
  managerMail: "",
};

export default memo(ChainSetting);
