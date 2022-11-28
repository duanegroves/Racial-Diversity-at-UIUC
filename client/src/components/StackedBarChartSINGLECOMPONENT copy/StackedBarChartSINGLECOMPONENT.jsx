import React from "react";
import * as d3 from "d3";
import useData from "../useData";

const StackedBarChartSINGLECOMPONENT = ({
  width,
  height,
  margin,
  dataCsvUrl,
  dataFilter,
  xValue,
  yValue,
}) => {
  let data = useData(dataCsvUrl);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  console.log(data);
  data = data.filter(dataFilter);
  console.log(data);

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
          {
            // X Scale Ticks and Labels
            xScale.ticks().map((tickValue) => (
              <g
                className="tick"
                key={tickValue}
                transform={`translate(${xScale(tickValue)},0)`}
              >
                <line y2={innerHeight} />
                <text
                  style={{ textAnchor: "middle" }}
                  dy=".71em"
                  y={innerHeight + 3}
                >
                  {tickValue}
                </text>
              </g>
            ))
          }
          {
            // Y Scale Ticks and Labels
            yScale.domain().map((tickValue) => (
              <g className="tick" key={tickValue}>
                <text
                  style={{ textAnchor: "end" }}
                  x={-3}
                  dy=".32em"
                  y={yScale(tickValue) + yScale.bandwidth() / 2}
                >
                  {tickValue}
                </text>
              </g>
            ))
          }
          {
            // Bars
            stackedData.map((col) => (
              <g key={col.key}>
                {col.map((el) => (
                  <rect
                    className="mark"
                    key={yValue(el.data) + "->" + col.key}
                    x={xScale(el[0])}
                    y={yScale(yValue(el.data))}
                    width={xScale(el[1]) - xScale(el[0])}
                    height={yScale.bandwidth()}
                    fill={colors(col.key)}
                  >
                    <title>{xValue(col)}</title>
                  </rect>
                ))}
              </g>
            ))
          }
        </g>
      </svg>
    </div>
  );
};

export default StackedBarChartSINGLECOMPONENT;
