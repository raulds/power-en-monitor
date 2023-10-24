import React, { useState } from 'react';
import { scaleLinear, scaleTime } from '@vx/scale';
import { AreaClosed, Line } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';
import { localPoint } from '@vx/event';
import { useTooltip, TooltipWithBounds } from '@vx/tooltip';

const VoltageGraph = ({ data, width, height }) => {
  // Define your x and y scales
  const xScale = scaleTime({
    domain: [new Date(data[0].time), new Date(data[data.length - 1].time)],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.value))],
    range: [height, 0],
  });

  // Define the tooltip
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    hideTooltip,
    showTooltip,
  } = useTooltip();

  const handleMouseOver = (event, d) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    const x = xScale.invert(coords.x);

    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: yScale(d.value),
      tooltipData: { time: x, value: d.value },
    });
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  return (
    <div>
      <svg width={width} height={height}>
        <GridRows scale={yScale} width={width} height={height} />
        <GridColumns scale={xScale} width={width} height={height} />
        <AxisLeft scale={yScale} />
        <AxisBottom scale={xScale} top={height} />
        <AreaClosed
          data={data}
          x={(d) => xScale(new Date(d.time))}
          y={(d) => yScale(d.value)}
          strokeWidth={2}
          stroke="transparent"
          fill="rgba(68, 138, 255, 0.3)"
          onMouseOver={(event, d) => handleMouseOver(event, d)}
          onMouseLeave={handleMouseLeave}
        />
        <Line
          data={data}
          x={(d) => xScale(new Date(d.time))}
          y={(d) => yScale(d.value)}
          stroke="#448AFF"
          strokeWidth={2}
        />
      </svg>
      {tooltipOpen && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={{ background: 'rgba(0,0,0,0.8)', color: 'white' }}
        >
          <div>
            Time: {new Date(tooltipData.time).toLocaleString()} <br />
            Voltage: {tooltipData.value}
          </div>
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default VoltageGraph;
