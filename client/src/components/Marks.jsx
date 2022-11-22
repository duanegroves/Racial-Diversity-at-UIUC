import React from 'react';

const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue
}) => {
  return (
    <>
      {data.map(col => 
        <rect
          className="mark"
          key={yValue(col)}
          x={0}
          y={yScale(yValue(col))}
          width={xScale(xValue(col))}
          height={yScale.bandwidth()}
        >
          <title>{xValue(col)}</title>
        </rect>
      )}
    </>
  )
}

export default Marks