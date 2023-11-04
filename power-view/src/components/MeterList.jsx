import React, {useState, useEffect} from 'react';
import axios from 'axios'

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import BarChartIcon from '@mui/icons-material/BarChart';
import { ElectricMeter } from '@mui/icons-material';


const MeterList = ({boardId, setMeterSource}) => {

  const [energyMeters, setEnergyMeters] = useState([])

  useEffect( () => {
    axios.get('http://localhost:3000/meters').then ( res => {
      let meterlist = []
      res.data.forEach(meter => {
        if (meter.dashboardId === boardId) {
          meterlist.push(meter)
        }  
      });
      setEnergyMeters(meterlist)
      console.log(meterlist)
    }).catch(error => {
      console.log(error)
      console.log('failed to fetch meter list')
    })
  }, [boardId])

  const handleClcik = (meter) => {
    console.log(meter.name)
    setMeterSource(meter)
  }

  if (energyMeters.length == 0) {
    return (
      <ListSubheader component="div" inset>
          No Meters Available 
      </ListSubheader>
    )
  } else {
    return (
      <React.Fragment>
        <ListSubheader component="div" inset>
          Select Meter
        </ListSubheader>
      {
        energyMeters.map( meter => (
          <ListItemButton key={meter.name} onClick={() => handleClcik(meter)}>
              <ListItemIcon>
                <ElectricMeter/>
              </ListItemIcon>
              <ListItemText primary={meter.name} />
          </ListItemButton>
        ))
      }
      </React.Fragment>
    )
  }
}

export default MeterList 