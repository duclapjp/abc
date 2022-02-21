import React, { memo } from "react";
import PropTypes from "prop-types";
import { Col, Button /*Checkbox*/ } from "antd";
import { Form, Select } from "formik-antd";
import { useIntl } from "react-intl";

import { colSingleLeft, itemSingleFullLabel } from "@iso/assets/styles/form.style";
import { SELECT_TASK_STATUS_LIST } from "@iso/constants/select.constant";
import { ROLES } from "@iso/constants/common.constant";

const ChainStoreExtendFields = ({
  role,
  editing,
  taskId,
  showStoreSelectPopup,
  // values,
  // handleFieldChange,
  // setFieldValue,
  previewMode,
  isChildTask,
}) => {
  const { messages } = useIntl();
  return (
    <>
      {taskId && (
        <Col {...colSingleLeft}>
          <Form.Item
            {...itemSingleFullLabel}
            label={messages["page.taskAddEdit.status"]}
            name="status"
          >
            <Select name="status" disabled={!editing || previewMode}>
              {SELECT_TASK_STATUS_LIST.OPTIONS.map((select, index) => (
                <Select.Option key={index} value={select}>
                  {select}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      )}
      {role === ROLES.CHAIN && (
        <Col {...colSingleLeft}>
          <Form.Item
            {...itemSingleFullLabel}
            label={messages["page.taskAddEdit.store"]}
            name="storeIds"
            required
          >
            <Button
              type="primary"
              name="storeIds"
              className="btnSelectStore"
              disabled={!editing || previewMode || isChildTask}
              onClick={showStoreSelectPopup}
            >
              {messages["page.taskAddEdit.btnSelectStore"]}
            </Button>
            {/* <Checkbox
              name="visible"
              checked={values.visible}
              onChange={(event) =>
                handleFieldChange(setFieldValue, "visible")(event.target.checked)
              }
            >
              {messages["page.taskAddEdit.childTask"]}
            </Checkbox> */}
          </Form.Item>
        </Col>
      )}
    </>
  );
};

ChainStoreExtendFields.propTypes = {
  role: PropTypes.string,
  editing: PropTypes.bool,
  taskId: PropTypes.string,
  showStoreSelectPopup: PropTypes.func,
  handleFieldChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  previewMode: PropTypes.bool,
  isChildTask: PropTypes.bool,
};

export default memo(ChainStoreExtendFields);
