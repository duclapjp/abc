import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { Tabs } from "antd";
import { map } from "lodash";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";

import PageHeader from "@iso/components/utility/pageHeader";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";

import { PlanAmountDefaultSettingStyles } from "./PlanAmountDefaultSetting.styles";
import PlanAmountDefaultSettingRoutes from "./PlanAmountDefaultSetting.routes";
import { Helmet } from "react-helmet";

const { TabPane } = Tabs;

const PlanAmountDefaultSetting = () => {
  const [tabActive, setTabActive] = useState(null);
  const { messages } = useIntl();
  const { url } = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();

  const onChange = useCallback((key) => history.push(`${url}/${key}`), [
    history,
    url,
  ]);

  const getTabActive = useMemo(() => pathname.split(`${url}/`), [pathname, url]);

  useEffect(() => {
    if (getTabActive[1]) {
      setTabActive(getTabActive[1].split("/")[0]);
    } else {
      setTabActive("default-plans");
    }
  }, [getTabActive]);

  return (
    <LayoutWrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{messages["page.planAmountDefaultSetting.title"]} | HLS</title>
      </Helmet>
      <PageHeader>{messages["page.planAmountDefaultSetting.title"]}</PageHeader>
      <LayoutContent>
        <PlanAmountDefaultSettingStyles>
          <Tabs type="card" onChange={onChange} activeKey={tabActive}>
            {map(tabs, (tab) => (
              <TabPane
                tab={messages[`page.planAmountDefaultSetting.tab.${tab.title}`]}
                key={tab.key}
              />
            ))}
          </Tabs>
          <PlanAmountDefaultSettingRoutes url={url} />
        </PlanAmountDefaultSettingStyles>
      </LayoutContent>
    </LayoutWrapper>
  );
};

const tabs = [
  {
    key: "default-plans",
    title: "defaultPlans",
  },
  {
    key: "amount-rank",
    title: "amountRank",
  },
  {
    key: "amount-groups",
    title: "amountGroups",
  },
];

export default PlanAmountDefaultSetting;
