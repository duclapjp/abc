import React, { memo } from "react";
import { InputNumber } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Input } from "antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import { Item } from "@iso/components/CategoryPlan/BasicPlanInfo/RoomUse";
import { InputGroupCustom } from "@iso/components/CategoryPlan/Dairekutoin/RangeOfCharges";
import { InputCharacterCustom } from "@iso/components/CategoryPlan/Rakuten/LimitedSales";

const RakutenSuperPoint = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rakuten.rakutenSuperPoint.title"]}
        subTitles={[
          messages["page.taskAddEdit.rakuten.rakutenSuperPoint.sub.title"],
        ]}
        index={index}
      />
      <ColRight>
        <Item
          name={`${name}.superPoint`}
          label={messages["page.taskAddEdit.rakuten.rakutenSuperPoint.input"]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <InputGroupCustom>
            <Input.Group className="input-group">
              <InputNumber
                disabled={disable}
                className="input-number"
                name={`${name}.superPoint`}
                defaultValue={0}
                max={100}
                min={0}
              />
              <InputCharacterCustom placeholder="%" disabled name="character" />
            </Input.Group>
          </InputGroupCustom>
        </Item>
      </ColRight>
    </PlanItemLayout>
  );
};

RakutenSuperPoint.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(RakutenSuperPoint);
