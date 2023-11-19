import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios'

const Cardinfo = ({ title, meter, unit, timeInterval }) => {

  const [totalPower, setTotalPower] = React.useState(0)
  const [meterData, setMeterData] = React.useState({})

  React.useEffect( () => {
    console.log('----')
    console.log(meter)
    console.log(timeInterval)
    console.log('----')

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
          console.log('fetch data')
          console.log(res.data)
          console.log('saved data')
          console.log(meterData)
        }).catch(err => {
          console.log(err)
          console.log('failed to fetch card info')
        })

  }, [timeInterval])
  

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
