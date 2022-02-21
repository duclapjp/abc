import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { useIntl } from "react-intl";

const ModalConfirm = ({ children, title, content, okText, cancelText, onOk }) => {
  const { messages } = useIntl();

  const confirm = () => {
    Modal.confirm({
      title: title || messages["feedback.modalconfirm.title"],
      content: content || "",
      okText: okText || messages["feedback.modalconfirm.yes"],
      cancelText: cancelText || messages["feedback.modalconfirm.no"],
      onOk() {
        setTimeout(onOk, 200);
      },
    });
  };

  return <span onClick={confirm}>{children}</span>;
};

ModalConfirm.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  content: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
};

export default ModalConfirm;
