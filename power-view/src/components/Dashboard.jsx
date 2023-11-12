import * as React from "react";

import { Container, Grid, Paper } from "@mui/material"
import Cardinfo from "./Cardinfo"; 
import CardBarGraph from "./CardBarGraph";
import axios from 'axios'

/*
    this component will just mount the cards, pizza and bar graphs
    the innecer components are in charge to load their numers and
    calculate it acording to the belloging meter(s) and the time
    interval.
*/
export const Dashboard = ( {boardid} ) => {

    const [boardMeters, setBoardMeters] = React.useState()

    React.useEffect( () => {
        // lets load all the meters which belogs to this dashboard
        axios.get(`http://localhost:3000/meters/${boardid}`)
        .then ( res => {
            if (res.data === null) {
                console.log('Service not available')
                return
            }

            if (res.data.err) {
                console.log('failed to fetch meters from databae')
                return
            }

            setBoardMeters(res.data)
        }).catch(err => {

            console.log(err)
        })
    }, [])

    const generatePowerCards = () => {

        return (
            <div>Numeric Power cards</div>
        )
    }

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
                    <Cardinfo
                        title="Energy Consumed Meter A"
                        value={250}
                        unit="kWh"
                        timeInterval="Last 24 hours"/>
                </Grid>
                <Grid item>
                    <Cardinfo
                        title="Energy Consumed Meter B"
                        value={250}
                        unit="kWh"
                        timeInterval="Last 24 hours"/>
                </Grid>
                <Grid item>
                    <CardBarGraph
                        title=""
                        data={energyData}
                        unit="kWh"
                        timeInterval="Last 24 hours"
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard;