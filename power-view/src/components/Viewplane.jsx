import * as React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { CssBaseline, Box, Toolbar, List, 
          Typography, Divider, IconButton, Container,
          Grid, Paper } from "@mui/material"

import AppBar from "./AppBar"
import Drawer from "./Drawer"

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Lists - make it import from database
import { mainListItems, SecondaryListItems } from "./listItems";
import MeterList from './MeterList'
import Boardlist from "./Boardlist";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// importing VoltageGraph
import VoltageGraph from "./VoltageGraph";
import CurrentGraph from "./CurrentGraph";
import ApparentPowerGraph from "./ApparentPowerGraph"
import ActivePowerGraph from "./ActivePowerGraph";
import PowerFactorGraph from "./PowerFactorGraph";
import ReactivePowerGraph from "./ReactivePowerGraph";

export default function Viewplane() {
  const [open, setOpen] = React.useState(false);
  const [energyMeter, setEnergyMeter] = React.useState({/*name:'meter01', id:1*/})
  const [dashboard, setBoard] = React.useState({id:1})
  const [dataFormat, setDataFormat] = React.useState('')

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>

        <CssBaseline />

        <AppBar position="absolute" open={open}>
          <Toolbar sx={{pr: '12px'}}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}>
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              Dashboard / {energyMeter.name} / Reads {dataFormat}
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />

          <List component="nav">
              <Boardlist setMainBoard={setBoard}/>
            <Divider sx={{ my: 1 }} />
              <MeterList boardId={dashboard.id} setMeterSource={setEnergyMeter}/>
            <Divider sx={{ my: 1 }} />
              <SecondaryListItems setInterval={setDataFormat} />
            
          </List>
        </Drawer>

        <Box component="main"
          sx={{ backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}>

          { /* just to place some space between the AppBar and the content*/ }
          <Toolbar />

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

        </Box>
      </Box>
    </ThemeProvider>
  );
}
