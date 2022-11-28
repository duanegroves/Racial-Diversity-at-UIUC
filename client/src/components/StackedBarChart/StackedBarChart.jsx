import React, { createRef } from "react";
import d3Tip from "d3-tip";
import * as d3 from "d3";
import useData from "../useData";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import Marks from "./Marks";

const StackedBarChart = ({
  width,
  height,
  margin,
  dataCsvUrl,
  xValue,
  yValue,
}) => {
  const data = useData(dataCsvUrl);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const keys = [
    "Race: Caucasian",
    "Race: Asian American",
    "Race: Hispanic",
    "Race: African American",
    "Race: Native American",
    "Race: Hawaiian/Pacific Isl",
    "Race: Multiracial",
    "Race: International",
    "Race: Unknown",
  ];

  const colors = d3
    .scaleOrdinal()
    .range([
      "#98abc5",
      "#8a89a6",
      "#7b6888",
      "#6b486b",
      "#a05d56",
      "#d0743c",
      "#ff8c00",
      "#d0743c",
      "#a05d56",
    ])
    .domain(keys);

  const stack = d3.stack().keys(keys);

  const stackedData = stack(data);

  return (
    <div id="svg_container">
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale} />
          <Marks
            stackedData={stackedData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            colors={colors}
          />
        </g>
      </svg>
    </div>
  );
};

export default StackedBarChart;
