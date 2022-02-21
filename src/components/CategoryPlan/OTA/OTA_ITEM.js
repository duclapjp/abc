import React, { memo, useEffect } from "react";
import { Select } from "formik-antd";
import { useIntl } from "react-intl";
import styled from "styled-components";
import PropsTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { map } from "lodash";

import storeActions from "@iso/redux/store/actions";
import { otaValues } from "@iso/constants/common.constant";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const OTA_ITEM = ({ name, disable, isStore, storeId }) => {
  const {
    // Auth: {
    //   user: { storeId },
    // },
    Store: { otas, loading },
  } = useSelector((state) => state);
  const { messages } = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (storeId) {
      isStore && dispatch(storeActions.getStoreOTAs(storeId));
    }
  }, [dispatch, storeId, isStore]);

  return (
    <PlanItemLayout>
      <ColLeft title={messages["page.taskAddEdit.otaItem.targetOTA"]} />
      <ColRight>
        <SelectCustom
          mode="multiple"
          name={`${name}.otas`}
          disabled={disable}
          loading={loading}
        >
          {map(otas, (ota) => (
            <SelectCustom.Option value={otaValues[ota.name]} key={ota.otaId}>
              {ota.name}
            </SelectCustom.Option>
          ))}
        </SelectCustom>
      </ColRight>
    </PlanItemLayout>
  );
};

export const SelectCustom = styled(Select)`
  &.ant-select {
    width: 30%;

    @media only screen and (max-width: 1200px) {
      width: 100%;
    }
  }
`;

OTA_ITEM.propTypes = {
  name: PropsTypes.string,
  disable: PropsTypes.bool,
  isStore: PropsTypes.bool,
  storeId: PropsTypes.any,
};

export default memo(OTA_ITEM);
