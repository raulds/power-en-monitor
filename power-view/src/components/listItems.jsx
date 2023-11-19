import React, {useState, useEffect} from 'react';
import axios from 'axios'

/*
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
*/


import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimelineIcon from '@mui/icons-material/Timeline';

export const ListRegisteredMeters = () => {

  const [energyMeters, setEnergyMeters] = useState([])

  useEffect( () => {
    axios.get('http://localhost:3000/meters').then ( res => {
      setEnergyMeters(meterlist)
      console.log(res.data)
    }).catch(error => {
      setEnergyMeters(['meters unavailable'])
      console.log(energyMeters)
      console.log('failed to fetch meter list')
    })
  })

  console.log('METER LIST')
  console.log(energyMeters)
  if (energyMeters.length == 0) {
    console.log('NOT POSSIBLE TO FETCH METERS FROM DATABASE')
    return (
      <React.Fragment>
        <ListSubheader component="div" inset>
          No meters available 
        </ListSubheader>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <ListSubheader component="div" inset>
          Select Meter
        </ListSubheader>
      {
        energyMeters.map( meter => (
          <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary={meter.name} />
          </ListItemButton>
        ))
      }
      </React.Fragment>
    )
  }
}

//export const secondaryListItems = (
export const SecondaryListItems = ( {setInterval} ) => {

  const [selectedDate, handleDateChange] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(true);
  }

  const handleDateClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Select Interval 
      </ListSubheader>

      <ListItemButton onClick={ () => setInterval({type: 'today', end: new Date(), begin: new Date()}) }>
        <ListItemIcon>
          <TimelineIcon/>
        </ListItemIcon>
        <ListItemText primary="Today" />
      </ListItemButton>

      <ListItemButton onClick={ () => setInterval({type: 'lastweek', end: new Date(), begin: new Date()}) }>
        <ListItemIcon>
          <TimelineIcon/>
        </ListItemIcon>
        <ListItemText primary="Last 7 days" />
      </ListItemButton>

       <ListItemButton onClick={ () => setInterval({type: 'lastmonth', end: new Date(), begin: new Date()}) }>
        <ListItemIcon>
          <TimelineIcon/>
        </ListItemIcon>
        <ListItemText primary="Last 30 days" />
      </ListItemButton>
      

      <ListItemButton onClick={ () => setInterval({type: 'timeslot', end: new Date(), begin: new Date()}) }>
        <ListItemIcon>
          <TimelineIcon/>
        </ListItemIcon>
        <ListItemText primary="Time Interval" />
      </ListItemButton>

{/*
      <Dialog open={open} onClose={handleDateClose}>
        <DialogTitle>Select Date</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
      </Dialog>
*/}

    </React.Fragment>
  )
}

export const mainListItems = (

  <React.Fragment>
  <ListSubheader component="div" inset>
    Select Meter
  </ListSubheader>
  <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Meter01" />
  </ListItemButton>

  <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Meter02" />
    </ListItemButton>
  </React.Fragment>
)