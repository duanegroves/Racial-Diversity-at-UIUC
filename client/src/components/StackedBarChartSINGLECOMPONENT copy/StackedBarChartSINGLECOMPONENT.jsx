import React, { useState } from "react";
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
  const [hoveredRace, setHoveredRace] = useState(null);
  const [hoveredToolTip, setHoveredToolTip] = useState(null);
  const fadeOpacity = 0.2;

  if (!data) {
    return <pre>Loading...</pre>;
  }

  data = data.filter(dataFilter);

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

  const colorScale = d3
    .scaleOrdinal()
    .domain(keys)
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
    ]);

  const stack = d3.stack().keys(keys);

  const stackedData = stack(data);

  return (
    <div id="svg_container">
      <svg width={width} height={height}>
        <g transform={`translate(${40},${margin.top})`}>
          {
            // Color Legend
            colorScale.domain().map((domainValue, i) => (
              <g
                key={domainValue}
                className="tick"
                transform={`translate(${(i % 4) * 180}, ${
                  Math.floor(i / 4) * 15
                })`}
                onMouseEnter={() => {
                  setHoveredRace(domainValue);
                }}
                onMouseOut={() => {
                  setHoveredRace(null);
                }}
                opacity={
                  hoveredRace && domainValue !== hoveredRace ? fadeOpacity : 1
                }
              >
                <circle fill={colorScale(domainValue)} r={5} />
                <text x={20} dy=".32em">
                  {domainValue.substring(6)}
                </text>
              </g>
            ))
          }
        </g>
        <g
          transform={`translate(${margin.left},${
            margin.top + (Math.floor(keys.length / 4) + 1) * 15
          })`}
        >
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
            stackedData.map((col, col_idx) => (
              <g
                key={col.key}
                opacity={
                  hoveredRace && col.key !== hoveredRace ? fadeOpacity : 1
                }
              >
                {col.map((el, el_idx) => (
                  <rect
                    className="mark"
                    key={el_idx + "->" + col.key}
                    x={xScale(el[0])}
                    y={yScale(yValue(el.data))}
                    width={xScale(el[1]) - xScale(el[0])}
                    height={yScale.bandwidth()}
                    fill={colorScale(col.key)}
                    onMouseEnter={() => {
                      setHoveredRace(col.key);
                      setHoveredToolTip(el_idx + "->" + col.key);
                    }}
                    onMouseOut={() => {
                      setHoveredRace(null);
                      setHoveredToolTip(null);
                    }}
                  />
                ))}
              </g>
            ))
          }
          {
            // ToolTips
            // Had to serparate from bars because bars were overlapping on z-index
            stackedData.map((col, col_idx) => (
              <g key={col.key}>
                {col.map((el, el_idx) => (
                  <g key={el_idx + "->" + col.key}>
                    {hoveredToolTip &&
                    hoveredToolTip === el_idx + "->" + col.key ? (
                      <foreignObject
                        id="tool_tip"
                        x={innerWidth - 200}
                        y={innerHeight - 200}
                        width={200}
                        height={200}
                        onMouseEnter={() => {
                          setHoveredRace(col.key);
                          setHoveredToolTip(el_idx + "->" + col.key);
                        }}
                        onMouseOut={() => {
                          setHoveredRace(null);
                          setHoveredToolTip(null);
                        }}
                      >
                        <div className="tool_tip" id="tool_tip">
                          <h3>{col.key.slice(6)}</h3>
                          <p>{yValue(el.data)}</p>
                          <div className="tool_tip_flex">
                            <div>
                              <h3>{el.data[col.key]}</h3>
                              <sub>students</sub>
                            </div>
                            <div>
                              <h3>
                                {(
                                  (el.data[col.key] / el.data.Total) *
                                  100
                                ).toFixed(2)}
                                %
                              </h3>
                              <sub>of students</sub>
                            </div>
                          </div>
                          <p>
                            Out of <span>{el.data.Total}</span> students
                          </p>
                        </div>
                      </foreignObject>
                    ) : null}
                  </g>
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
