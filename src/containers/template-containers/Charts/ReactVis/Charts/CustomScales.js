import React, { Component } from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
} from "react-vis";
import ChartWrapper from "../../Charts.styles";

export default class extends Component {
  render() {
    const { datas, width, height } = this.props;
    return (
      <ChartWrapper className="isoChartWrapper">
        <XYPlot xType="linear" width={width} height={height}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis title="X Axis" />
          <YAxis title="Y Axis" />
          {datas.map((data, key) => (
            <LineSeries data={data.data} key={key} />
          ))}
        </XYPlot>
      </ChartWrapper>
    );
  }
}
