import React from 'react';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@vx/gradient';

import axios from 'axios'

const ReactivePowerGraph = ({meter, interval}) => {

    const [powerSamples, setPowerSamples] = React.useState([])
    const [width, setWidth] = React.useState(1050)
    const [height, setHeight] = React.useState(400)

    React.useEffect( () => {
        axios.post(`http://localhost:3000/samples/rctpower/${meter}`, interval).then ( res => {
          setPowerSamples(res.data)
        }).catch(error => {
          console.log(error)
          console.log('failed to fetch reactive power samples')
        })
    }, [interval, meter])
    
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    powerSamples.forEach( sample => {
      sample.createdAt = new Date(sample.createdAt)
    })
    const xxScale = scaleTime(
      {
        domain: [ Math.min(...powerSamples.map(d => d.createdAt)),
                  Math.max(...powerSamples.map(d => d.createdAt))],
        range: [0, xMax],
      });
    const yyScale = scaleLinear({
      domain: [0, Math.max(...powerSamples.map(d => d.reactive_power))],
      range: [yMax, 0],
    });         

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>

        <LinearGradient from='#fbc2eb' to='#a6c1ee' id='gradient'/>

        <AreaClosed
          data={powerSamples}
          x={d => xxScale(d.createdAt)}
          y={d => yyScale(d.reactive_power)}
          yScale={yyScale}
          fill={"url(#gradient)"}
          curve={curveMonotoneX}/>

        <LinePath
          data={powerSamples}
          x={d => xxScale(d.createdAt)}
          y={d => yyScale(d.reactive_power)}
          stroke="#007acc"
          strokeWidth={1}
          curve={curveMonotoneX}/>

        <AxisLeft scale={yyScale} top={0} left={0} label="Reactive Power (VAR)" />
        <AxisBottom scale={xxScale} top={yMax} label="Time" />
      </Group>
    </svg>
  );
};

export default ReactivePowerGraph;
