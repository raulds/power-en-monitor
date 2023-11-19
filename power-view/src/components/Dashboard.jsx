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
export const Dashboard = ( {boardid, boardMeterList, interval} ) => {

    const [boardMeters, setBoardMeters] = React.useState()
    const [meterData, setMeterData] = React.useState([])
    let receivedMeterData = []

    /*
    React.useEffect( () => {
        
        console.log('selected interval')
        console.log(interval)

        if (!interval) {
            console.log('no valid interval defined to fetch and format date into dashboard')
            return
        }

        boardMeterList.forEach( async meter => {

            try {
                const res = await axios.post(`http://localhost:3000/meterpw/powerbymeter/${meter.id}`, interval)
                if( !res.data && res.data.err == false) {
                    console.log('failed to fetch power meter interval')
                    return
                }
                setMeterData([...meterData, res.data])

            } catch (err) {
                console.log(err)
                console.log('failed to get meter power usage from backend')
            }
            
        });

    }, [interval])

        console.log(meterData)
        console.log('abacate')
        */

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

      if (!boardMeterList) {
          return <div>Loading...</div>
      } else {


    return (
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item>
                    <Cardinfo
                        title="Total of Energy Consumed"
                        value={meterData}
                        unit="kWh"
                        timeInterval="Last 24 hours"/>
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