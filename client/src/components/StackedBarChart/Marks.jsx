import { color } from "d3";
import React from "react";

const Marks = ({ stackedData, xScale, yScale, xValue, yValue, colors }) => {
  return (
    <>
      {stackedData.map((col) => (
        <g key={col.key}>
          {col.map((el) => (
            <rect
              className="mark"
              key={col.key + "->" + yValue(el.data)}
              x={xScale(el[0])}
              y={yScale(yValue(el.data))}
              width={xScale(el[1])}
              height={yScale.bandwidth()}
              fill={colors(col.key)}
            >
              <title>{xValue(col)}</title>
            </rect>
          ))}
        </g>
      ))}
    </>
  );
};

export default Marks;
