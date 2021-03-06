import React, { Component } from "react";
import ChartWrapper from "../../Charts.styles";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries,
  AreaSeries,
} from "react-vis";

export default class extends Component {
  render() {
    const { datas, width, height } = this.props;
    return (
      <ChartWrapper className="isoChartWrapper">
        <XYPlot width={width} height={height}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {datas.map((data, key) => {
            const config = {
              className: data.className,
              data: data.data,
              color: data.color,
            };
            return <AreaSeries {...config} key={key} />;
          })}
          <LineMarkSeries
            className="area-elevated-line-series"
            data={datas[1].data}
          />
        </XYPlot>
      </ChartWrapper>
    );
  }
}
