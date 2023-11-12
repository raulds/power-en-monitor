// src/PizzaGraph.js
import React from 'react';
import { Typography, Paper, Card } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import { PieChart, Pie, Cell } from 'recharts';

import Grid from '@mui/material/Grid';

const CardPizzaGraph = ({ data, tittle, timeInterval }) => {
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'];

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
                      data={data}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label>

                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                </PieChart>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  {`for ${timeInterval}`}
                </Typography>
              </Grid>
            </Grid>
        </CardContent>
    </Card>

  )};

export default CardPizzaGraph;
