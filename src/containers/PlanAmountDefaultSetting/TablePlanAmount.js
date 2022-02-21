/* eslint-disable react/display-name */
import React, { memo, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { AddRowButton } from "formik-antd";
import { Empty, Table } from "antd";
import { useIntl } from "react-intl";
import { PlusOutlined } from "@ant-design/icons";
import { DndProvider, createDndContext } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FieldArray } from "formik";
import { isEmpty } from "lodash";

import DragableBodyRow from "./DragableBodyRow";
import columns from "./TablePlanAmount.data";

const TablePlanAmount = ({
  name,
  dataSource,
  initPlanAmount,
  tableOpts,
  loading,
  url,
}) => {
  const { messages } = useIntl();
  const manager = useRef(RNDContext);

  const moveRow = useCallback(({ dragIndex, hoverIndex, arrayHelpers }) => {
    arrayHelpers.move(dragIndex, hoverIndex);
  }, []);

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <DndProvider manager={manager.current.dragDropManager}>
          <Table
            tableLayout="auto"
            bordered
            loading={loading}
            rowKey={(_, idx) => idx}
            dataSource={dataSource}
            columns={columns({
              messages,
              tableName: name,
              initPlanAmount,
              url,
            })}
            pagination={false}
            scroll={{
              x: "max-content",
              y: "calc(100vh - 25em)",
            }}
            components={components}
            onRow={(record, index) => ({
              index,
              moveRow: (dragIndex, hoverIndex) =>
                moveRow({ dragIndex, hoverIndex, arrayHelpers }),
            })}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<span>{messages["antTable.emptyData"]}</span>}
                >
                  {!isEmpty(initPlanAmount) && (
                    <AddRowButton
                      name={name}
                      type="primary"
                      createNewRow={() => initPlanAmount}
                    >
                      <PlusOutlined />
                      {messages["page.Account.buttonAdd"]}
                    </AddRowButton>
                  )}
                </Empty>
              ),
            }}
            {...tableOpts}
          />
        </DndProvider>
      )}
    />
  );
};

const components = {
  body: {
    row: DragableBodyRow,
  },
};

const RNDContext = createDndContext(HTML5Backend);

export const tableNames = {
  defaultPlans: "defaultPlans",
  amountRanks: "amountRanks",
  amountGroups: "amountGroups",
};

TablePlanAmount.propTypes = {
  name: PropTypes.string.isRequired,
  dataSource: PropTypes.array.isRequired,
  initPlanAmount: PropTypes.object,
  tableOpts: PropTypes.object,
  loading: PropTypes.bool,
  url: PropTypes.string,
  onUpdateStatus: PropTypes.func,
};

TablePlanAmount.defaultProps = {
  dataSource: [],
  initPlanAmount: {},
};

export default memo(TablePlanAmount);
