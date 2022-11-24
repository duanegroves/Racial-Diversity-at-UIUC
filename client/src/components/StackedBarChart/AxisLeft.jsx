import React from 'react';

const AxisLeft = ({ yScale }) => {
  return yScale.domain().map(tickValue => (
    <g 
      className="tick"
      key={tickValue}
    >
      <text
        style={{ textAnchor: 'end' }}
        x={-3}
        dy=".32em"
        y={yScale(tickValue) + yScale.bandwidth() / 2}
      >
        {tickValue}
      </text>
    </g>
  ));
}

export default AxisLeft;
  