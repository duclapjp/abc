import React, { Component } from "react";
import { Radar } from "react-chartjs-2";
import { data } from "./RadarConfig";

export default class extends Component {
  render() {
    return <Radar data={data} height={230} />;
  }
}
