import * as React from "react";

import { Container, Grid, Paper } from "@mui/material"
import Cardinfo from "./Cardinfo"; 
import CardBarGraph from "./CardBarGraph";
import CardPizzaGraph from "./CardPizzagraph"
import axios from 'axios'

/*
    this component will just mount the cards, pizza and bar graphs
    the innecer components are in charge to load their numers and
    calculate it acording to the belloging meter(s) and the time
    interval.
*/
export const Dashboard = ( {boardid, boardMeterList} ) => {

    const [boardMeters, setBoardMeters] = React.useState()

    React.useEffect( () => {
        // lets load all the meters which belogs to this dashboard

        boardMeterList.forEach(meter => {
            
        });
        
    }, )

    const generatePowerCards = () => {

        return (
            <div>Numeric Power cards</div>
        )
    }

    const pizzaData = [
        { name: 'Cheese', value: 20 },
        { name: 'Pepperoni', value: 30 },
        { name: 'Vegetarian', value: 25 },
        { name: 'Hawaiian', value: 15 },
      ];

    const energyData = [
        { label: 'Hour 1', value: 50 },
        { label: 'Hour 2', value: 75 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        { label: 'Hour 3', value: 60 },
        // Add more data points as needed
      ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item>
                    <Cardinfo
                        title="Total of Energy Consumed"
                        value={250}
                        unit="kWh"
                        timeInterval="Last 24 hours"/>
                </Grid>

                <Grid item>
                    <CardPizzaGraph tittle={"Energy Consumed By Meter"} data={pizzaData}
                                timeInterval={"Last 24 hours"}/>
                </Grid>

                {
                    boardMeterList.map( meter => (
                        <>
                        <Grid item>
                            <Cardinfo
                                title={`Energy Consumed Meter ${meter.name}`}
                                value={250}
                                unit="kWh"
                                timeInterval="Last 24 hours"/>
                        </Grid>

                        <Grid item>
                            <CardBarGraph
                                title={`Energy Consuption by Meter ${meter.name}`}
                                data={energyData}
                                unit="kWh"
                                timeInterval="Last 24 hours"
                            />
                        </Grid>
                        </>
                    ))

                }
                
            </Grid>
        </Container>
    )
}

export default Dashboard;