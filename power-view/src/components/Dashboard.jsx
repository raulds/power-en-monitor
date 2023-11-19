import * as React from "react";

import { Container, Grid, Paper } from "@mui/material"
import Cardinfo from "./Cardinfo"; 
import CardBarGraph from "./CardBarGraph";
import CardPizzaGraph from "./CardPizzagraph"
import CardPwTotal from "./CardPwTotal";

/*
    this component will just mount the cards, pizza and bar graphs
    the innecer components are in charge to load their numers and
    calculate it acording to the belloging meter(s) and the time
    interval.
*/
export const Dashboard = ( {boardid, boardMeterList, interval} ) => {

const pizzaData = [
        { name: 'Cheese', value: 20 },
        { name: 'Pepperoni', value: 30 },
        { name: 'Vegetarian', value: 25 },
        { name: 'Hawaiian', value: 15 },
      ];

      if (!boardMeterList) {
          return <div>Loading...</div>
      } else {

    return (
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item>
                    <CardPwTotal
                        title="Total of Energy Consumed"
                        board={boardid}
                        unit="kWh"
                        timeInterval={interval}/>
                </Grid>

                <Grid item>
                    <CardPizzaGraph tittle={"Energy Consumed By Meter"} data={pizzaData}
                                timeInterval={"Last 24 hours"}/>
                </Grid>

                {
                    boardMeterList.map( meter => (
                        <React.Fragment key={meter.name}>
                        <Grid item>
                            <Cardinfo
                                title={`Energy Consumed Meter ${meter.name}`}
                                meter={meter.id}
                                unit="kWh"
                                timeInterval={interval}/>
                        </Grid>

                        <Grid item>
                            <CardBarGraph
                                title={`Energy Consuption by Meter ${meter.name}`}
                                meter={meter.id}
                                unit="kWh"
                                timeInterval={interval}
                            />
                        </Grid>
                        </React.Fragment>
                    ))

                }
                
            </Grid>
        </Container>
    )
            }
}

export default Dashboard;

/*
    

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

*/