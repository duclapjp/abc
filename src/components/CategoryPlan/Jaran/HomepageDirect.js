import React, { memo } from "react";
import { Checkbox } from "formik-antd";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  PlanItemLayout,
  ColRight,
  ColLeft,
} from "@iso/components/CategoryPlan/PlanItemLayout";

const HomepageDirect = ({ name, disable }) => {
  const { messages } = useIntl();

  return (
    <PlanItemLayout>
      <ColLeft title={messages["page.taskAddEdit.jaran.homepageDirect.title"]} />
      <ColRight>
        <Checkbox disabled={disable} name={`${name}.sell`}>
          {
            messages[
              "page.taskAddEdit.jaran.homepageDirect.checkbox.homepageDirectSell"
            ]
          }
        </Checkbox>
      </ColRight>
    </PlanItemLayout>
  );
};

HomepageDirect.propTypes = {
  name: PropTypes.string,
  disable: PropTypes.bool,
};

export default memo(HomepageDirect);
