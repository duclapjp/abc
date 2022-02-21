/* eslint-disable react/display-name  */
import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

const AmountGroupAddEditTable = (props) => {
  const { amount, columns, loading } = props;

  return (
    <Table
      bordered
      pagination={false}
      dataSource={amount}
      columns={columns}
      rowKey={(_, idx) => idx}
      scroll={{ x: "max-content" }}
      rowClassName={() => "editable-row"}
      loading={loading}
    />
  );
};

AmountGroupAddEditTable.propTypes = {
  amount: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
};

export default AmountGroupAddEditTable;
