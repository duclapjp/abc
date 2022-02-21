import React, { Component } from "react";
import { Row } from "antd";
// import IntlMessages from "@iso/components/utility/intlMessages";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import PageHeader from "@iso/components/utility/pageHeader";
// import { ControlButtonGroup } from "@iso/components/common/ControlButtonGroup.style";

export default class BlankPage extends Component {
  render() {
    return (
      <LayoutWrapper>
        <PageHeader>
          Dashboard
          {/*<IntlMessages id="sidebar.blankPage" />*/}
        </PageHeader>
        <LayoutContent>
          {/*<Row>*/}
          {/*  <ControlButtonGroup>*/}
          {/*    <Button type="primary">Submit</Button>*/}
          {/*    <Button type="default">Cancel</Button>*/}
          {/*  </ControlButtonGroup>*/}
          {/*</Row>*/}
          <Row>
            <h1>Dashboard Page content</h1>
          </Row>
        </LayoutContent>
      </LayoutWrapper>
    );
  }
}
