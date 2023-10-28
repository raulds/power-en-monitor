import React from 'react'
import { Grid } from '@mui/material';
import Viewplane from './components/Viewplane'
import SignIn from './components/SignIn';

function App() {
  const [userAuth, setUserAuth] = React.useState(false)

  return (
    <Grid container direction='column' spacing={2} width='100vw' height='100vh'>
      <Grid item sapcing={1} >
        {
          (userAuth) 
          ? <Viewplane/>
          : <SignIn setAuthStatus={setUserAuth}/>
        }
      </Grid>
    </Grid>
  )
}

export default App
