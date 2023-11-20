import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import axios from 'axios'

export default class SignIn extends React.Component {

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = { email: data.get('email'), password: data.get('password') }

    if (!payload.email || !payload.password) {
        console.log('missing credentials informatin')
        return
    }
    //await this.props.authenticate(credentials)

    axios.post('http://localhost:3000/users/auth/', payload).then ( res => {

        if(!res.data) {
            console.log('no response received from server, it may be offline')
            return
        }

        //console.log(res.data)
        // authenticatin sucess
        if(!res.data.err){
          this.props.setAuthStatus(true)
        } else {
          this.props.setAuthStatus(false)
        }

    }).catch (err => {
        console.log(err)
        console.log('failed logint attempt')
    })

    
  };

  render () {
    return (
        <Container component="main" maxWidth="xs">
          <Box sx={{
              marginTop: 8, marginBottom: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center',
            }}>

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box component="form" onSubmit={ this.handleSubmit } 
              noValidate sx={{ mt: 1 }}>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus/>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password" />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>

            </Box>
          </Box>
        </Container>
    )
  }
}