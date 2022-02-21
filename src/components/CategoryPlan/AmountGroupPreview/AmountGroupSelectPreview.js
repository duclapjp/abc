import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { useIntl } from "react-intl";
import { columns } from "./AmountGroupPreview.data";
import PropTypes from "prop-types";

import ModalPreviewStyle from "./AmountGroupPreview.style";
import taskActions from "@iso/redux/taskAddEdit/actions";

const AmountGroupPreview = () => {
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const {
    PlanAmount: { amountGroup, loading, numberPeople },
    TaskAddEdit: { amountGroupPreviewModal, previewItem },
  } = useSelector((state) => state);

  return (
    <ModalPreviewStyle
      title={messages["page.TemPlate.titleAmountGroupsPreview"]}
      bodyStyle={bodyModalStyle}
      width="calc(100vw - 50px)"
      centered={true}
      visible={amountGroupPreviewModal}
      onOk={() => dispatch(taskActions.toggleAmountGroupPreview())}
      onCancel={() => dispatch(taskActions.toggleAmountGroupPreview())}
    >
      <Table
        bordered
        pagination={false}
        dataSource={amountGroup.amountGroupRanks}
        columns={columns({
          messages,
          length: numberPeople,
          previewItem,
        })}
        rowKey={(r) => r.amountRankId}
        scroll={{ x: "max-content" }}
        rowClassName={() => "editable-row"}
        loading={loading}
      />
    </ModalPreviewStyle>
  );
};

const bodyModalStyle = {
  overflowY: "scroll",
  height: "calc(100vh - 18em)",
  width: "auto",
};

AmountGroupPreview.propTypes = {
  previewStatus: PropTypes.bool,
  cancelPreview: PropTypes.func,
  previewItem: PropTypes.any,
};

export default memo(AmountGroupPreview);
