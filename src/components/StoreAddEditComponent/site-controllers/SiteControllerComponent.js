import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { FieldArray } from "formik";
import { columns } from "./data";
import { SiteControllerWrapper } from "./SiteControllerComponent.style";
import { ROLES } from "@iso/constants/common.constant";
import { useSelector } from "react-redux";

const SiteControllerComponent = ({
  onFormChange,
  siteControllersData = [],
  siteDatas = [],
  editing,
}) => {
  const { user } = useSelector((state) => state.Auth);
  const role = user.role;
  const isUser = role === ROLES.USER;

  const handleDataChange = useCallback(
    (name, value) => {
      onFormChange(name, value);
    },
    [onFormChange]
  );

  const siteControllerOptions = siteControllersData.map((item) => ({
    value: item.siteControllerId,
    name: item.name,
  }));

  return (
    <SiteControllerWrapper>
      <FieldArray
        name="siteControllers"
        render={(arrayHelpers) => (
          <Table
            bordered
            rowKey="siteControllerId"
            dataSource={siteDatas}
            columns={columns({
              siteControllers: siteControllerOptions,
              handleDataChange,
              size: siteDatas.length,
              editing,
              arrayHelpers,
              tableFieldName: "siteControllers",
              isUser: isUser,
            })}
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        )}
      />
    </SiteControllerWrapper>
  );
};

SiteControllerComponent.propTypes = {
  siteDatas: PropTypes.array,
  siteControllersData: PropTypes.array,
  onFormChange: PropTypes.func,
  editing: PropTypes.bool,
};

export default SiteControllerComponent;
