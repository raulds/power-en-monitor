import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'

const CardBarGraph = ({ title, meter, unit, timeInterval }) => {

  const [data, setData] = React.useState()

  React.useEffect( () => {

    if (!meter || !timeInterval) {
      console.log('no valid meter or interval')
      return
    }

    axios.post(`http://localhost:3000/meterpw/powerdata/${meter}`, timeInterval).then ( res => {

    if( !res.data && res.data.err == false) {
        console.log('failed to fetch power meter interval')
        return
      }
      // formating data to fit the card bar graph
      let formatedpw = []
      res.data.meterdata.forEach( pw => {
        formatedpw.push({
          label: pw.createdAt,
          value: pw.active_power
        })
      })
      // array prev
      console.log('array prev')
      console.log(formatedpw)
      // saving the meter data fetch from database as a state
      //setData(res.data.meterdata)
      setData(formatedpw)
      //console.log('meter data')
      //console.log(data)
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
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name={unit} />
              </BarChart>
            </ResponsiveContainer>
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

export default CardBarGraph;
