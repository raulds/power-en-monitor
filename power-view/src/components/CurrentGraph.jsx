import React from 'react';
import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@vx/gradient';

import axios from 'axios'

const CurrentGraph = ({meter, format, refWid, refHei}) => {
    const [currentSamples, setCurrentSamples] = React.useState([])
    const [width, setWidth] = React.useState(500)
    const [height, setHeight] = React.useState(400)

    React.useEffect( () => {
        axios.get(`http://localhost:3000/samples/current/${meter}`).then ( res => {
          setCurrentSamples(res.data)
        }).catch(error => {
          console.log(error)
          console.log('failed to fetch voltage samples')
        })
    }, [meter])
    
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    currentSamples.forEach( sample => {
      sample.updatedAt = new Date(sample.updatedAt)
    })
    const xxScale = scaleTime(
      {
        domain: [ Math.min(...currentSamples.map(d => d.updatedAt)),
                  Math.max(...currentSamples.map(d => d.updatedAt))],
        range: [0, xMax],
      });
    const yyScale = scaleLinear({
      domain: [0, Math.max(...currentSamples.map(d => d.current))],
      range: [yMax, 0],
    });         

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {/* Area Closed */}
        <LinearGradient
            from='#fbc2eb'
            to='#a6c1ee'
            id='gradient'/>

        <AreaClosed
          data={currentSamples}
          x={d => xxScale(d.updatedAt)}
          y={d => yyScale(d.current)}
          yScale={yyScale}
          fill={"url(#gradient)"}
          curve={curveMonotoneX}
        />
        {/* Line Path (optional) */}
        <LinePath
          data={currentSamples}
          x={d => xxScale(d.updatedAt)}
          y={d => yyScale(d.current)}
          stroke="#007acc"
          strokeWidth={1}
          curve={curveMonotoneX}
        />
        {/* X and Y Axes */}

        <AxisLeft scale={yyScale} top={0} left={0} label="Current (A)" />
        <AxisBottom scale={xxScale} top={yMax} label="Time" />
      </Group>
    </svg>
  );
};

export default CurrentGraph;
