import React, { useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { Badge, Table, Tabs, Empty, Button } from "antd";
import { FieldArray } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, forEach } from "lodash";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import { ROLES } from "@iso/constants/common.constant";
import storeActions from "@iso/redux/storeAddEdit/actions";
import { OtaContext } from "@iso/containers/StoreAddAndEdit/StoreAddAndEdit";

import { columns, initOtaData } from "./data";
import { StoreOtaListWrapper } from "./StoreOtaList.style";

const { TabPane } = Tabs;

const StoreOtaList = ({ onFormChange, editing }) => {
  const {
    Auth: { user },
    OTA,
    StoreAddEdit: { loading },
  } = useSelector((state) => state);
  const role = user.role;
  const isUser = role === ROLES.USER;
  const { messages } = useIntl();
  const { storeId } = useParams();
  const otas = useContext(OtaContext);
  const dispatch = useDispatch();

  const handleDataChange = useCallback(
    (name, value) => {
      onFormChange(name, value);
    },
    [onFormChange]
  );

  const handleUpdateExpired = useCallback(
    (payload) => dispatch(storeActions.updateExpired({ storeId, ...payload })),
    [dispatch, storeId]
  );

  const otaOptions = (otaTypeId) => {
    const options = [];
    forEach(OTA.otas, (item) => {
      if (item.otaTypeId === otaTypeId) {
        options.push({
          ...item,
          value: item.otaId,
        });
      }
    });
    return options;
  };

  return (
    <Tabs type="card">
      {OTA.otaTypes.map((otaType) => {
        const dataSource = otas[otaType.otaTypeId];
        const size = !isEmpty(dataSource) ? dataSource.length : 0;
        return (
          <TabPane
            tab={
              <>
                {otaType.name}
                {size > 0 && <Badge count={size} />}
              </>
            }
            key={otaType.otaTypeId}
          >
            <StoreOtaListWrapper>
              <FieldArray
                name={`otas.${otaType.otaTypeId}`}
                render={(arrayHelpers) => {
                  return (
                    <Table
                      bordered
                      loading={loading}
                      rowKey={(record, idx) => idx}
                      dataSource={dataSource}
                      columns={columns({
                        otaOptions: otaOptions(otaType.otaTypeId),
                        handleDataChange,
                        size,
                        editing,
                        arrayHelpers,
                        tableFieldName: `otas.${otaType.otaTypeId}`,
                        isUser,
                        handleUpdateExpired,
                        otaTypeId: otaType.otaTypeId,
                      })}
                      scroll={{ x: "max-content" }}
                      pagination={false}
                      locale={{
                        emptyText: (
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                              <span>{messages["antTable.emptyData"]}</span>
                            }
                          >
                            <Button
                              disabled={!editing || isUser}
                              onClick={() => arrayHelpers.push(initOtaData)}
                              type="primary"
                            >
                              <PlusOutlined />
                              {messages["page.Account.buttonAdd"]}
                            </Button>
                          </Empty>
                        ),
                      }}
                    />
                  );
                }}
              />
            </StoreOtaListWrapper>
          </TabPane>
        );
      })}
    </Tabs>
  );
};

StoreOtaList.propTypes = {
  // otas: PropTypes.object,
  otaOptionData: PropTypes.array,
  onFormChange: PropTypes.func,
  editing: PropTypes.bool,
};

export default StoreOtaList;
