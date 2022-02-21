import React, { memo, useEffect, useState } from "react";
import { Radio } from "formik-antd";
import { useIntl } from "react-intl";
import IntlMessages from "@iso/components/utility/intlMessages";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";
import Pattern1 from "@iso/components/CategoryPlan/Cost/Pattern1";
import Pattern2 from "@iso/components/CategoryPlan/Cost/Pattern2";
import Pattern3 from "@iso/components/CategoryPlan/Cost/Pattern3";
import { RadioGroupVertical } from "@iso/components/CategoryPlan/BasicPlanInfo/RoomUse";

const PatternDefault = ({
  name,
  defaultValue = {},
  disable,
  setFieldValue,
  index,
}) => {
  const { messages } = useIntl();
  const [pattern, setPattern] = useState(null);

  const onChange = (e) => {
    setPattern(e.target.value);
  };

  useEffect(() => {
    setPattern(defaultValue.patternDefault);
  }, [defaultValue.patternDefault]);

  return (
    <>
      <PlanItemLayout>
        <ColLeft
          title={messages["page.taskAddEdit.cost.patternDefault.title"]}
          index={index}
        />
        <ColRight>
          <RadioGroupVertical
            name={`${name}.patternDefault`}
            onChange={onChange}
            value={pattern}
            disabled={disable}
          >
            {RADIO_OPTIONS.map((item, idx) => (
              <Radio key={idx} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </RadioGroupVertical>
        </ColRight>
      </PlanItemLayout>
      {pattern === "pattern1" ? (
        <Pattern1
          name={`${name}.pattern1`}
          disable={disable}
          setFieldValue={setFieldValue}
          defaultValue={defaultValue}
        />
      ) : pattern === "pattern2" ? (
        <Pattern2 name={`${name}.pattern2`} disable={disable} />
      ) : (
        pattern === "pattern3" && (
          <Pattern3 name={`${name}.pattern3`} disable={disable} />
        )
      )}
    </>
  );
};

const RADIO_OPTIONS = [
  {
    value: "pattern2",
    label: <IntlMessages id="page.taskAddEdit.cost.patternDefault.pattern2" />,
  },
  {
    value: "pattern1",
    label: <IntlMessages id="page.taskAddEdit.cost.patternDefault.pattern1" />,
  },
  {
    value: "pattern3",
    label: <IntlMessages id="page.taskAddEdit.cost.patternDefault.pattern3" />,
  },
];

PatternDefault.propTypes = {
  name: PropTypes.string,
  values: PropTypes.object,
  defaultValue: PropTypes.object,
  disable: PropTypes.bool,
  setFieldValue: PropTypes.any,
  index: PropTypes.any,
};

export default memo(PatternDefault);
