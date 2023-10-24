import React from 'react'
import { Grid } from '@mui/material';
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn';

function App() {
  const [userAuth, setUserAuth] = React.useState(false)

  return (
    <Grid container direction='column' spacing={2} width='100vw' height='100vh'>
      <Grid item sapcing={1} >
        {
          (userAuth) 
          ? <Dashboard/>
          : <SignIn setAuthStatus={setUserAuth}/>
        }
      </Grid>
    </Grid>
  )
}

export default App
