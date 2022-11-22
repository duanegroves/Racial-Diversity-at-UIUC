import React from 'react';
import * as d3 from 'd3';
import useData from '../useData';
import AxisBottom from './AxisBottom';
import AxisLeft from './AxisLeft';
import Marks from './Marks';

const StackedBarChart = ({ width, height, margin, dataCsvUrl, xValue, yValue }) => {
  const data = useData(dataCsvUrl);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const keys = ["Race: White", "Race: Asian American", "Race: Hispanic/Latino", "Race: Black", "Race: Native American", "Race: Hawaiian/Pacific Islander", "Race: Multiracial", "Race: International", "Race: Unknown"]
  
  const color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#d0743c", "#a05d56"]);

  const stack = d3.stack(keys)

  const stackedData = stack(data)

  console.log(stackedData)

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <AxisLeft yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};

export default StackedBarChart;
