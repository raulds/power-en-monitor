import React from 'react';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@vx/gradient';

import { localPoint } from '@vx/event';
import axios from 'axios'
import { colors } from '@mui/material';

const VoltageGraph = ({meter, format}) => {
    const [voltagesamples, setVSamples] = React.useState([])
    const [width, setWidth] = React.useState(500)
    const [height, setHeight] = React.useState(400)

    React.useEffect( () => {
      console.log('goning to fetch voltage data - debug message')
        axios.get(`http://localhost:3000/samples/voltage/${meter}`).then ( res => {
          console.log(`http://localhost:3000/samples/voltage/${meter}`)
          setVSamples(res.data)
          console.log(res.data)
        }).catch(error => {
          console.log(error)
          console.log('failed to fetch voltage samples')
        })
    },[meter])
    
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    voltagesamples.forEach( sample => {
      sample.updatedAt = new Date(sample.updatedAt)
    })
    const xxScale = scaleTime(
      {
        domain: [ Math.min(...voltagesamples.map(d => d.updatedAt)),
                  Math.max(...voltagesamples.map(d => d.updatedAt))],
        range: [0, xMax],
      });
    const yyScale = scaleLinear({
      domain: [0, Math.max(...voltagesamples.map(d => d.voltage))],
      range: [yMax, 0],
    });         

    const handleMouseOver = (event, d) => {
      const coords = localPoint(event.target.ownerSVGElement, event);
      const x = xxScale.invert(coords.x);
      console.log(x)
      console.log(d)
    }
  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {/* Area Closed */}
        <LinearGradient
            from='#fbc2eb'
            to='#a6c1ee'
            id='gradient'/>

        <AreaClosed
          data={voltagesamples}
          x={d => xxScale(d.updatedAt)}
          y={d => yyScale(d.voltage)}
          yScale={yyScale}
          fill={"url(#gradient)"}
          curve={curveMonotoneX}
          onMouseOver={handleMouseOver}
        />
        {/* Line Path (optional) */}
        <LinePath
          data={voltagesamples}
          x={d => xxScale(d.updatedAt)}
          y={d => yyScale(d.voltage)}
          stroke="#007acc"
          strokeWidth={1}
          curve={curveMonotoneX}
          onMouseOver={ (event, d) => handleMouseOver}
        />
        {/* X and Y Axes */}

        <AxisLeft scale={yyScale} top={0} left={0} label="Voltage (V)" />
        <AxisBottom scale={xxScale} top={yMax} label="Time" />
      </Group>
    </svg>
  );
};

export default VoltageGraph;
