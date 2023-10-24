import React, {useState, useEffect} from 'react';
import axios from 'axios'

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

//export const secondaryListItems = (
export const SecondaryListItems = (props) => {

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Select Interval 
      </ListSubheader>

      <ListItemButton onClick={ () => props.setInterval('byhour') }>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last Hour" />
      </ListItemButton>

      <ListItemButton onClick={ () => props.setInterval('byday') }>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last Day" />
      </ListItemButton>

      <ListItemButton onClick={ () => props.setInterval('byread') }>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last Interval" />
      </ListItemButton>

    </React.Fragment>
  )
}
//);

export const old_mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);


