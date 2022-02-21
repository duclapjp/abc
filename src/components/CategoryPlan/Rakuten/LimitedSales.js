import React, { memo } from "react";
import { InputNumber } from "formik-antd";
import styled from "styled-components";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Input } from "antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { InputGroupCustom } from "@iso/components/CategoryPlan/Dairekutoin/RangeOfCharges";
import { Item } from "@iso/components/CategoryPlan/BasicPlanInfo/RoomUse";
import { InputCharacter } from "@iso/components/CategoryPlan/Ikkyu/SleepingWithChildren";

const LimitedSales = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rakuten.limitedSales.title"]}
        subTitles={[messages["page.taskAddEdit.rakuten.limitedSales.sub.title"]]}
        index={index}
      />
      <ColRight>
        <Item
          name={`${name}.limitedSales`}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <InputGroupCustom>
            <Input.Group className="input-group">
              <InputNumber
                disabled={disable}
                className="input-number"
                name={`${name}.limitedSales`}
                defaultValue={0}
                min={0}
              />
              <InputCharacterCustom placeholder="部屋" disabled name="character" />
            </Input.Group>
          </InputGroupCustom>
        </Item>
      </ColRight>
    </PlanItemLayout>
  );
};

export const InputCharacterCustom = styled(InputCharacter)`
  &.ant-input[disabled] {
    width: 60px;
  }
`;

LimitedSales.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(LimitedSales);
