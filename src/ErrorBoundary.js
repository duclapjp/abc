import React from "react";
import { Result, Button } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title={<FormattedMessage id="error" />}
          subTitle={<FormattedMessage id="error.title" />}
          extra={
            <Button type="primary" onClick={this.handleReload}>
              <FormattedMessage id="error.btn" />
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
