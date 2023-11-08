import * as React from "react";

// basic material UI components
import { Container, Grid, Paper } from "@mui/material"

// importing VoltageGraph
import VoltageGraph from "./VoltageGraph";
import CurrentGraph from "./CurrentGraph";
import ApparentPowerGraph from "./ApparentPowerGraph"
import ActivePowerGraph from "./ActivePowerGraph";
import PowerFactorGraph from "./PowerFactorGraph";
import ReactivePowerGraph from "./ReactivePowerGraph";


export const Meterview = ({energyMeter}) => {

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 'auto'
                  }}>
                  Voltage Monitor
                  <VoltageGraph meter={energyMeter.id} />
                </Paper>
              </Grid>

              <Grid item>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 'auto'
                  }}>
                  Current Monitor
                  <CurrentGraph meter={energyMeter.id}/>
                </Paper>
              </Grid>

              <Grid item>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 'auto'
                  }}>
                  Power Factor 
                  <PowerFactorGraph meter={energyMeter.id}/>
                </Paper>
              </Grid>

              <Grid item>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 'auto'
                  }}>
                  Active Power Monitor 
                  <ActivePowerGraph meter={energyMeter.id}/>
                </Paper>
              </Grid>

              <Grid item>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 'auto'
                  }}>
                  Apparent Power Monitor 
                  <ApparentPowerGraph meter={energyMeter.id}/>
                </Paper>
              </Grid>
              
              <Grid item>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 'auto'
                  }}>
                  Reactive Power Monitor 
                  <ReactivePowerGraph meter={energyMeter.id}/>
                </Paper>
              </Grid>

            </Grid>
          </Container>
    )

}

export default Meterview;