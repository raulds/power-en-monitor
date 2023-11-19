import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { Grid, Box } from '@mui/material';

const CardPwTotal = ({ title, board, unit, timeInterval, chargeModel }) => {

  const [boardPower, setBoardPower] = React.useState({})
  const [cost, setCost] = React.useState()

  React.useEffect( () => {

    console.log('----BoardId----')
    console.log(board)
    if (!board || !timeInterval) {
      console.log('no valid meter or interval')
      return
    }
        axios.post(`http://localhost:3000/meterpw/powerbyboard/${board}`, timeInterval).then ( res => {

          if( !res.data && res.data.err == false) {
            console.log('failed to fetch power meter interval')
            return
          }
          // saving the meter data fetch from database as a state
          setBoardPower(res.data.meterdata)

        }).catch(err => {
          console.log(err)
          console.log('failed to fetch card info')
        })

  }, [timeInterval])
  

  const CalcCharge = () => {

    if (chargeModel.TY === 0){
         setCost(((boardPower.active_power * chargeModel.TE) + (boardPower.active_power * chargeModel.TUSD))/1000)
         console.log('-cost-')
         console.log(cost)

    }
     return (
         <div>R$ {cost}</div>
     ) 
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component="div">
                {
                    parseFloat( boardPower.active_power / 1000).toFixed(2)
                }
                <Typography variant="subtitle1" component="span" color="textSecondary">
                {unit}
                </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CalcCharge/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              {`for ${timeInterval.type}`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardPwTotal;
