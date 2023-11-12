import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Cardinfo = ({ title, value, unit, timeInterval }) => {
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
              {value}
              <Typography variant="subtitle1" component="span" color="textSecondary">
                {unit}
              </Typography>
            </Typography>
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

export default Cardinfo;
