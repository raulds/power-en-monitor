// src/PizzaGraph.js
import React from 'react';
import { Typography, Paper, Card } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import { PieChart, Pie, Cell } from 'recharts';

import axios from 'axios'

import Grid from '@mui/material/Grid';

// Legend component to illustrate the pie chart
const Legend = ({ data, colors }) => (
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {data.map((entry, index) => (
      <li key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <div style={{ width: '10px', height: '10px', backgroundColor: colors[index], marginRight: '5px' }}></div>
        <span>{entry.name}</span>
      </li>
    ))}
  </ul>
);

const CardPizzaGraph = ({ board, tittle, timeInterval }) => {
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#BF6384', '#FA6384'];

  const [powerArray, setPowerArray] = React.useState([])

  React.useEffect( () => {

    console.log('----BoardId----')
    console.log(board)

    if (!board || !timeInterval) {
      console.log('no valid meter or interval')
      return
    }
        axios.post(`http://localhost:3000/meterpw/boardpowerpercent/${board}`, timeInterval).then ( res => {

          if( !res.data && res.data.err == false) {
            console.log('failed to fetch power meter interval')
            return
          }
          // saving the meter data fetch from database as a state

          console.log(res.data)
          setPowerArray(res.data.powerbymeter)
          console.log(powerArray)

        }).catch(err => {
          console.log(err)
          console.log('failed to fetch card info')
        })

  }, [timeInterval])

  return (
    <Card variant="outlined">
        <CardContent>
            <Grid container >
              <Grid item xs={12}>
                <Typography variant="h6" component="div">
                  {tittle}
                </Typography>
              </Grid>
              <Grid item xs={12} >
                <PieChart width={400} height={400}>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={powerArray}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label>
                      {
                        powerArray.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                      }
                    </Pie>
                </PieChart>
                <Legend data={powerArray} colors={COLORS}/>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  {`for ${timeInterval.type}`}
                </Typography>
              </Grid>
            </Grid>
        </CardContent>
    </Card>

  )};

export default CardPizzaGraph;
