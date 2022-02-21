/* eslint-disable react/display-name  */
import React, { useState, memo, useEffect } from "react";
import { Row, Col, Table } from "antd";
import { ModalWrapper } from "./AmountGroupSelect.styles";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Checkbox, Form } from "formik-antd";
import { forEach, groupBy, get, has, isEmpty } from "lodash";

import taskActions from "@iso/redux/taskAddEdit/actions";
import Columns from "./AmountGroupSelect.data";
import AmountGroupPreview from "@iso/components/CategoryPlan/AmountGroupPreview/AmountGroupSelectPreview";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import planAmountActions from "@iso/redux/planAmount/actions";

const AmountGroupSelect = ({ name, setFieldValue, defaultValue = {} }) => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelect, setItemSelect] = useState([]);
  const [initialValues, setInitialValues] = useState(initialValuesDefault);
  const [loading, setLoading] = useState(true);
  const { amountGroupSelectModal, taskMode } = useSelector(
    (state) => state.TaskAddEdit
  );
  const { amountGroups } = useSelector((state) => state.PlanAmount);

  useEffect(() => {
    if (defaultValue.pattern1 && taskMode) {
      const arr = [];
      forEach(get(defaultValue, "pattern1.amountGroupSelects"), (item) => {
        arr.push(item.amountGroupId);
      });
      setSelectedRowKeys([...arr]);
    }
  }, [defaultValue, taskMode]);

  useEffect(() => {
    const amountGroupSelects = [];
    forEach(amountGroups.amountGroups, function (item) {
      amountGroupSelects.push({
        amountGroupId: item.amountGroupId,
        amountGroupName: item.amountGroupName,
        discounts: 0,
        unit: "円",
      });
    });
    if (defaultValue.pattern1) {
      const amountGroupSelectDefault = defaultValue.pattern1.amountGroupSelects;
      const newArr = groupBy(amountGroupSelectDefault, "amountGroupId");
      const newAmountGroupSelect = [];
      forEach(amountGroupSelects, (item) => {
        if (taskMode && has(newArr, item["amountGroupId"])) {
          newAmountGroupSelect.push(get(newArr, `${item.amountGroupId}[0]`));
        } else if (!has(newArr, item["amountGroupId"])) {
          newAmountGroupSelect.push(item);
        }
      });
      setInitialValues((prevState) => ({
        ...prevState,
        amountGroupSelects: newAmountGroupSelect,
      }));
    } else {
      setInitialValues((prevState) => ({
        ...prevState,
        amountGroupSelects: amountGroupSelects,
      }));
    }
    setLoading(false);
  }, [amountGroups.amountGroups, defaultValue.pattern1, taskMode]);

  const showPreView = (value) => {
    const { amountGroupId } = value;
    dispatch(taskActions.toggleAmountGroupPreview());
    dispatch(planAmountActions.getAmountItemEdit({ id: amountGroupId }));
    dispatch(taskActions.setItemPreview(value));
  };

  const onSubmit = (values) => {
    const data = get(defaultValue, "pattern1.amountGroupSelects");
    const itemSelected = [];
    const amountGroups = groupBy(values.amountGroupSelects, "amountGroupId");
    forEach(selectedRowKeys, (item) => {
      if (has(amountGroups, item)) {
        itemSelected.push(get(amountGroups, `${item}[0]`));
      }
    });

    if (!taskMode && !isEmpty(data)) {
      setFieldValue(`${name}.amountGroupSelects`, [...data, ...itemSelect]);
    } else {
      setFieldValue(`${name}.amountGroupSelects`, itemSelected);
    }
    dispatch(taskActions.toggleAmountGroupSelect());
  };

  return (
    <Formik
      onSubmit={false}
      initialValues={initialValues}
      enableReinitialize={true}
      render={({ values, setFieldValue }) => {
        return (
          <ModalWrapper
            title={messages["page.TemPlate.titleAmountGroupsSelect"]}
            bodyStyle={bodyModalStyle}
            width="calc(100vw - 50px)"
            centered={true}
            visible={amountGroupSelectModal}
            okText={messages["page.Account.buttonSave"]}
            onOk={() => onSubmit(values)}
            onCancel={() => dispatch(taskActions.toggleAmountGroupSelect())}
          >
            <Form colon={false} labelAlign="left" className="hls-form">
              <Row>
                <Col sm={24}>
                  <Table
                    name={"amountGroupSelects"}
                    rowSelection={{
                      selectedRowKeys: selectedRowKeys,
                      onChange: (selectedRowKeys, itemSelected) => {
                        setSelectedRowKeys(selectedRowKeys);
                        setItemSelect(itemSelected);
                      },
                      renderCell: (checked, record, index, originNode) => {
                        return (
                          <Checkbox
                            name={`amountGroupSelects[${index}].checked`}
                            onChange={(e) => {
                              setFieldValue(e.target.name, e.target.checked);
                              originNode.props.onChange(e);
                            }}
                          />
                        );
                      },
                      onSelectAll: (selected, selectedRows, changeRows) => {
                        changeRows.forEach((row, index) => {
                          setFieldValue(
                            `amountGroupSelects[${index}].checked`,
                            selected
                          );
                        });
                      },
                    }}
                    pagination={false}
                    bordered
                    dataSource={values.amountGroupSelects}
                    columns={Columns({
                      tableName,
                      messages,
                      showPreView,
                    })}
                    loading={loading}
                    scroll={{ x: "max-content" }}
                    rowKey={(r) => r.amountGroupId}
                  />
                </Col>
              </Row>
              <Row>
                <AmountGroupPreview />
              </Row>
            </Form>
          </ModalWrapper>
        );
      }}
    />
  );
};

const bodyModalStyle = {
  overflowY: "scroll",
  height: "calc(100vh - 20em)",
  width: "auto",
};

AmountGroupSelect.propTypes = {
  setFieldValue: PropTypes.any,
  name: PropTypes.any,
  values: PropTypes.object,
  defaultValue: PropTypes.object,
};

const initialValuesDefault = {
  amountGroupSelects: [],
};

const tableName = "amountGroupSelects";

export default memo(AmountGroupSelect);
