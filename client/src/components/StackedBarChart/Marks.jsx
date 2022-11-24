import { color } from 'd3';
import React from 'react';

const Marks = ({
  stackedData,
  xScale,
  yScale,
  xValue,
  yValue,
  colors,
  toolTip
}) => {
  console.log(stackedData)
  return (
    <>
      {stackedData.map(col=> 
        <g key={col.key}>
          {col.map(el =>
            <rect
              className="mark"
              key={col.key+'->'+yValue(el.data)}
              x={xScale(el[0])}
              y={yScale(yValue(el.data))}
              width={xScale(el[1])}
              height={yScale.bandwidth()}
              fill={colors(col.key)}
              onMouseEnter={() => toolTip.style("visibility", "visible")}
              onMouseMove={(event) => {
                console.log(event)
                toolTip.style("top", (event.pageY)+"px").style("left",(event.pageX)+"px")
              }}
              onMouseLeave={() => toolTip.style("visibility", "hidden")}
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