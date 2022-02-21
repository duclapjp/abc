import React, { memo } from "react";
import { Radio } from "formik-antd";
import { useIntl } from "react-intl";
import IntlMessages from "@iso/components/utility/intlMessages";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const PublicFlag = ({ name, disable, otas = [], visible = true, index }) => {
  const { messages } = useIntl();

  if (!otas.includes("RAKUTEN_TAB") || !visible) {
    return <></>;
  }

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.rakuten.publicFlag.title"]}
        index={index}
        otas={otas}
      />
      <ColRight>
        <Radio.Group disabled={disable} name={`${name}.publicFlag`}>
          {RADIO_OPTIONS.map((item, idx) => (
            <Radio name={`${name}.publicFlag`} key={idx} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </ColRight>
    </PlanItemLayout>
  );
};

const RADIO_OPTIONS = [
  {
    value: "accommodation",
    label: (
      <IntlMessages id="page.taskAddEdit.rakuten.publicFlag.radio.accommodation" />
    ),
  },
  {
    value: "package",
    label: <IntlMessages id="page.taskAddEdit.rakuten.publicFlag.radio.package" />,
  },
];

PublicFlag.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  visible: PropTypes.bool,
  otas: PropTypes.array,
  index: PropTypes.any,
};

export default memo(PublicFlag);
