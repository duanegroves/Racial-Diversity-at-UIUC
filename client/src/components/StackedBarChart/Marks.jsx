import { color } from 'd3';
import React from 'react';

const Marks = ({
  stackedData,
  xScale,
  yScale,
  xValue,
  yValue,
  colors
}) => {
  console.log(stackedData)
  return (
    <>
      {stackedData.map(col=> 
        <g>
          {col.map(el =>
            <rect
              className="mark"
              key={yValue(col)+ ":"+col.key}
              x={xScale(el[0])}
              y={yScale(yValue(el.data))}
              width={xScale(el[1])}
              height={yScale.bandwidth()}
              fill={colors(col.key)}
            >
              <title>{xValue(col)}</title>
            </rect>
          )}
        </g>
      )}
    </>
  )
}

export default Marks