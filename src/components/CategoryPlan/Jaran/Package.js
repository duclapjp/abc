import React, { memo } from "react";
import { Checkbox } from "formik-antd";
import { useIntl } from "react-intl";
import IntlMessages from "@iso/components/utility/intlMessages";
import PropTypes from "prop-types";
import { Row } from "antd";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const Package = ({ name, disable, index }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft
        title={messages["page.taskAddEdit.jaran.package.title"]}
        index={index}
      />
      <ColRight>
        <Row>
          <Checkbox.Group disabled={disable} name={`${name}.package`}>
            {packageOptions.map((item, idx) => (
              <Checkbox name={`${name}.package`} key={idx} value={item.value}>
                {item.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Row>
      </ColRight>
    </PlanItemLayout>
  );
};

const packageOptions = [
  {
    label: <IntlMessages id="page.taskAddEdit.jaran.package.radio.jal" />,
    value: "jal",
  },
  {
    label: <IntlMessages id="page.taskAddEdit.jaran.package.radio.ana" />,
    value: "ana",
  },
  {
    label: <IntlMessages id="page.taskAddEdit.jaran.package.radio.jr" />,
    value: "jr",
  },
];

Package.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
  index: PropTypes.any,
};

export default memo(Package);
