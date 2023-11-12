import * as React from "react";

import { Container, Grid, Paper } from "@mui/material"
import Cardinfo from "./Cardinfo"; 
import CardBarGraph from "./CardBarGraph";

export const Dashboard = ( {name, code, setMeterList} ) => {

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