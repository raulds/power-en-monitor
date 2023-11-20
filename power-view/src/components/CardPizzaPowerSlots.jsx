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

const CardPizzaPowerSlots = ({ meter, tittle, timeInterval, chargeModel }) => {
  const COLORS = ['#6EAA5E', '#FFCE56', '#FF6384', '#4CAF50', '#BF6384', '#FA6384'];

  const [powerArray, setPowerArray] = React.useState([])
  const [minCost, setMinCost] = React.useState()
  const [intCost, setIntCost] = React.useState()
  const [spotCost, setSpotCost] = React.useState()

  const TotalPower = () => {
    let total = 0
    powerArray.forEach (power => {
        total += power.value
    })
    return <div>{total}</div>
  }

  const CalcCharge = () => {

    let cost = 0
    powerArray.forEach ( power => {
        cost = 0
        if (power.name == 'fora de ponta') {
            cost = (0.36989*power.value) + (0.30988*power.value) 
            setMinCost(cost)
        } else if (power.name == 'intermediario') {
            cost = (0.36989*power.value) + (0.59272*power.value) 
            setIntCost(cost)
        } else if (power.name == 'ponta') {
            cost = (0.57965*power.value) + (0.87557*power.value) 
            setSpotCost(cost)
        }
    })

    return (
        <div>
            <div>
                Fora de Ponta
                R$ {minCost}
            </div>
            <div>
                Intermediario
                R$ {intCost}
            </div>
            <div>
                Ponta
                R$ {spotCost}
            </div>
        </div>
    )

  }

  React.useEffect( () => {

    //console.log('----meterid----')
    //console.log(meter)

    if (!meter || !timeInterval) {
      console.log('no valid meter or interval')
      return
    }
        axios.post(`http://localhost:3000/meterpw/powerslots/${meter}`, timeInterval).then ( res => {

          if( !res.data && res.data.err == false) {
            console.log('failed to fetch power meter interval')
            return
          }
          // saving the meter data fetch from database as a state

          ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          console.log(res.data)
          setPowerArray(res.data.powerslots)
          console.log(powerArray)

          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

        }).catch(err => {
          console.log(err)
          console.log('failed to fetch card info')
        })

  }, [timeInterval])

  return (
    <Card variant="outlined" >
        <CardContent>
            <Grid container >
              <Grid item xs={12}>
                <Typography variant="h6" component="div">
                  {tittle}
                </Typography>
              </Grid>

              <Grid item xs={6} >
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
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                      }
                    </Pie>
                </PieChart>
                <Legend data={powerArray} colors={COLORS}/>
              </Grid>

              <Grid item xs={6}>
              <Typography variant="h6" component="div">
                      Estimated Charge
                    <TotalPower/>                   
              </Typography>
              <Typography variant="h6" component="div">
                    <CalcCharge/>
              </Typography>
              </Grid>
            </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  {`for ${timeInterval.type}`}
                </Typography>
              </Grid>
        </CardContent>
    </Card>

  )};

export default CardPizzaPowerSlots;
