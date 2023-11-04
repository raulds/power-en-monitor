import React, {useState, useEffect} from 'react';
import axios from 'axios'

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';


const Boardlist = ({setDashboard}) => {

  const [dashboards, setDashboards] = useState([])

  useEffect( () => {
    axios.get('http://localhost:3000/boards').then ( res => {
      setDashboards(res.data)
      console.log(res.data)
    }).catch(error => {
      console.log(error)
      console.log('failed to fetch meter list')
    })
  }, [])

  const handleClcik = (board) => {
    console.log(meter.name)
    setDashboard(board)
  }

  if (dashboards.length == 0) {
    return (
      <ListSubheader component="div" inset>
          No dashboards available 
      </ListSubheader>
    )
  } else {
    return (
      <React.Fragment>
        <ListSubheader component="div" inset>
          Select Dashboard 
        </ListSubheader>
      {
        dashboards.map( board => (
          <ListItemButton key={board.name} onClick={() => handleClcik(board)}>
              <ListItemIcon>
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary={board.name} />
          </ListItemButton>
        ))
      }
      </React.Fragment>
    )
  }
}

export default Boardlist 