import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Row, Col, Modal, Button, Table, Select, Form, Input } from "antd";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { filter, isEmpty, find } from "lodash";

import {
  itemLeftLabel,
  itemRightLabel,
  colRight,
  colLeft,
  colFull,
  itemFullLabel,
} from "@iso/assets/styles/form.style";
import { ROLES } from "@iso/constants/common.constant";
import selectStoreActions from "@iso/redux/selectStore/actions";

import SelectStoreStyles from "./SelectStore.styles";

const SelectStore = ({ onSelect, selected }) => {
  const {
    Auth: {
      user: { role },
    },
    SelectStore: { loading, loadingMetaData, stores, directors, chains, show },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const [conditionDirector, setConditionDirector] = useState(null);
  const [conditionChains, setConditionChains] = useState([]);
  const [conditionStores, setConditionStores] = useState([]);
  const [storeSelected, setStoreSelected] = useState(selected || []);

  const handleChangeChain = useCallback(
    (chainIds) => {
      setStoreSelected([]);
      setConditionChains(chainIds);
    },
    [setStoreSelected, setConditionChains]
  );

  // useEffect(() => {
  //   if (chains) {
  //     let defaultChainId = null;
  //     if (selected && !isEmpty(selected)) {
  //       for (let index = 0; index < stores.length; index += 1) {
  //         const item = stores[index];
  //         if (selected.includes(item.storeId)) {
  //           defaultChainId = item.chainId;
  //         }
  //       }
  //     }
  //     setConditionChains(
  //       defaultChainId ? defaultChainId : chains[0] && chains[0].chainId
  //     );
  //   }
  // }, [chains, stores, selected]);

  useEffect(() => {
    setConditionChains(null);
  }, []);

  useEffect(() => {
    if (show) {
      dispatch(selectStoreActions.fetchStores({}));
      role === ROLES.ADMIN &&
        dispatch(selectStoreActions.fetchSelectStoreMetadata());
    }
  }, [dispatch, role, show]);

  useEffect(() => {
    if (show) {
      setStoreSelected(selected ? [...selected] : null);
    }
  }, [selected, show]);

  const onDecision = useCallback(() => {
    onSelect(!isEmpty(storeSelected) ? [...storeSelected] : null);
    dispatch(selectStoreActions.toggleSelectStore());
  }, [onSelect, storeSelected, dispatch]);

  const onCancel = () => dispatch(selectStoreActions.toggleSelectStore());

  const onChangeStoreName = (event) => {
    setConditionStores(
      event.target.value
        .toLowerCase()
        .split(" ")
        .filter((s) => s !== "")
    );
  };

  const dataSource = useMemo(() => {
    return filter(stores, (store) => {
      return (
        (!conditionDirector || store.directorId === conditionDirector) &&
        (!conditionChains || store.chainId === conditionChains) &&
        (isEmpty(conditionStores) ||
          find(conditionStores, (c) => store.name.toLowerCase().includes(c)))
      );
    });
  }, [stores, conditionDirector, conditionChains, conditionStores]);

  const enhanceSelectedRows = (selectedRows) => {
    const dataSourceId = dataSource.map((item) => item.storeId);
    const otherSelected = storeSelected
      ? storeSelected.filter((item) => !dataSourceId.includes(item))
      : [];
    const newStoreId = [];
    selectedRows.map((item) => {
      if (item && item.storeId) {
        newStoreId.push(item.storeId);
      }
      return item;
    });
    return [...otherSelected, ...newStoreId];
  };

  const rowSelection = {
    onSelect: (record, selected, selectedRows) =>
      setStoreSelected([...enhanceSelectedRows(selectedRows)]),
    onSelectAll: (selected, selectedRows) =>
      setStoreSelected([...enhanceSelectedRows(selectedRows)]),
    selectedRowKeys: storeSelected ? storeSelected : [],
    selections: true,
  };

  return (
    <Modal
      title={messages["popup.selectStore.header"]}
      style={{ top: 20 }}
      width={768}
      visible={show}
      footer={null}
      onCancel={onCancel}
    >
      {show && (
        <SelectStoreStyles>
          {role === ROLES.ADMIN && (
            <Row className="mx-24">
              <Col {...colLeft}>
                <Form.Item
                  label={messages["page.Account.admin"]}
                  colon={false}
                  labelAlign="left"
                  defaultValue={null}
                  {...itemLeftLabel}
                >
                  <Select
                    loading={loadingMetaData}
                    onChange={(value) => setConditionDirector(value)}
                    value={conditionDirector}
                  >
                    <Select.Option value={null}>
                      {messages["input.select.all"]}
                    </Select.Option>
                    {directors.map((director, idx) => (
                      <Select.Option key={idx} value={director.directorId}>
                        {director.displayName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col {...colRight}>
                <Form.Item
                  label={messages["page.Account.chain"]}
                  colon={false}
                  labelAlign="left"
                  {...itemRightLabel}
                >
                  <Select
                    value={conditionChains}
                    loading={loadingMetaData}
                    // mode="multiple"
                    onChange={handleChangeChain}
                    filterOption={false}
                    // allowClear
                    placeholder={messages["page.Account.chain"]}
                  >
                    <Select.Option value={null}>
                      {messages["input.select.all"]}
                    </Select.Option>
                    {chains.map((chain, idx) => (
                      <Select.Option key={idx} value={chain.chainId}>
                        {chain.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row className="mx-24">
            <Col {...colFull}>
              <Form.Item
                label={messages["page.storeList.storeName"]}
                colon={false}
                labelAlign="left"
                {...itemFullLabel}
              >
                <Input
                  placeholder={messages["popup.selectStore.placeholder"]}
                  onChange={onChangeStoreName}
                />
              </Form.Item>
            </Col>
          </Row>
          <Table
            className="mt-24"
            bordered
            pagination={false}
            columns={generateColumns(messages, role)}
            loading={loading}
            rowSelection={rowSelection}
            rowKey="storeId"
            scroll={{ x: 500, y: "calc(100vh - 540px)" }}
            dataSource={dataSource}
          />
          <Row justify="center" className="mt-24">
            <Button onClick={onCancel}>
              {messages["page.Account.buttonCancel"]}
            </Button>
            <Button type="primary" htmlType="button" onClick={onDecision}>
              {messages["popup.selectStore.decision"]}
            </Button>
          </Row>
        </SelectStoreStyles>
      )}
    </Modal>
  );
};

const generateColumns = (messages, role) => {
  return [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: messages["page.storeList.storeName"],
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    ...(role === ROLES.ADMIN
      ? [
          {
            title: messages["page.Account.admin"],
            dataIndex: "directorName",
            key: "directorName",
            align: "center",
          },
        ]
      : []),
  ];
};

SelectStore.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.array,
};

export default memo(SelectStore);
