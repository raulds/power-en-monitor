import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CardBarGraph = ({ title, data, unit, timeInterval }) => {
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
              {`for ${timeInterval}`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardBarGraph;
