import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios'

const Cardinfo = ({ title, meter, unit, timeInterval, chargeModel }) => {

  const [meterData, setMeterData] = React.useState({})
  const [cost, setCost] = React.useState()

  React.useEffect( () => {

    if (!meter || !timeInterval) {
      console.log('no valid meter or interval')
      return
    }
        axios.post(`http://localhost:3000/meterpw/powerbymeter/${meter}`, timeInterval).then ( res => {

          if( !res.data && res.data.err == false) {
            console.log('failed to fetch power meter interval')
            return
          }
          // saving the meter data fetch from database as a state
          setMeterData(res.data.meterdata)
        }).catch(err => {
          console.log(err)
          console.log('failed to fetch card info')
        })

  }, [timeInterval])

  const CalcCharge = () => {

    if (chargeModel.TY === 0){
         setCost(((meterData.active_power * chargeModel.TE) + (meterData.active_power * chargeModel.TUSD))/1000)
        // console.log('-cost-')
         //console.log(cost)
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
              { parseFloat( meterData.active_power / 1000).toFixed(2)}
              <Typography variant="subtitle1" component="span" color="textSecondary">
                {unit}
              </Typography>

            </Typography>
          <Grid item xs={12}>
            <CalcCharge/>
          </Grid>
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

export default Cardinfo;
