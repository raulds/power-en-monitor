import * as React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Submenu from './Submenu';
import { AppBar, Typography } from '@mui/material';
import { Toolbar } from '@mui/material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';


export default class Mainmenu extends React.Component {

    /*
     * This class will control what options the main menu needs to render
     * and what the content holder needs to render bellow
     */
    constructor (props) {
        super(props)
        this.showUsersbuttons = this.showUsersbuttons.bind(this)
        this.showProceduresButtons = this.showProceduresButtons.bind(this)
        this.changeMenu = this.changeMenu.bind(this)

        this.state = {
            menustate: 'USERS',
            userpage:'',
            procpage:'',
            patpage:'',
            agendapage:'',
        }
    }

    setPageNewUser () {
        this.props.updateContent('NEWUSER')
    }
    setPageListUser() {
        this.props.updateContent('LISTUSER')
    }
    setPageNewPat() {
        //console.log('newpat')
        this.props.updateContent('NEWPAT')
    }
    setPageListPat() {
        this.props.updateContent('LISTPAT')
    }

    showUsersbuttons () {
        return (
            <React.Fragment>
                <Stack spacing={2} direction='row' divider={<Divider orientation="vertical" flexItem />}>
                    <Button style={{whiteSpace: 'nowrap', width:'max-content'}} variant='text' color='inherit' onClick={this.setPageNewUser.bind(this)}>
                        Novo Usuario  
                    </Button>
                    <Button style={{whiteSpace: 'nowrap', width:'max-content'}} variant='text' color='inherit' onClick={this.setPageListUser.bind(this)}>
                        Visualizar Usuários 
                    </Button>
                    <Button style={{whiteSpace: 'nowrap', width:'max-content'}} variant='text' color='inherit'>
                        Opções 
                    </Button>
                </Stack>
            </React.Fragment>
        )
    }

    showPatiantbuttons () {
        return (
            <React.Fragment>
                <Stack spacing={2} direction='row' divider={<Divider orientation="vertical" flexItem />}>
                    <Button style={{whiteSpace: 'nowrap', width:'max-content'}} variant='text' color='inherit' onClick={this.setPageNewPat.bind(this)}>
                        Inserir Paciente 
                    </Button>
                    <Button style={{whiteSpace: 'nowrap', width:'max-content'}} variant='text' color='inherit' onClick={this.setPageListPat.bind(this)}>
                        Visualizar Pacientes 
                    </Button>
                    <Button style={{whiteSpace: 'nowrap', width:'max-content'}} variant='text' color='inherit'>
                        Opções 
                    </Button>
                </Stack>
            </React.Fragment>
        )
    }
    setPageNewProc() {
        this.props.updateContent('NEWPROC')
    }
    setPageListProc() {
        this.props.updateContent('LISTPROC')
    }
    showProceduresButtons () {
        return (
            <React.Fragment> 
                <Stack spacing={2} direction='row' divider={<Divider orientation="vertical" flexItem />}>
                    <Button style={{whiteSpace: 'nowrap', width:'max-content'}} variant='text' color='inherit' onClick={this.setPageNewProc.bind(this)}>
                        Novo Procedimento 
                    </Button>
                    <Button style={{whiteSpace: 'nowrap', width:'max-content'}} variant='text' color='inherit' onClick={this.setPageListProc.bind(this)}>
                        Visualizar Procedimentos
                    </Button>
                    <Button style={{whiteSpace: 'nowrap', width:'max-content'}} variant='text' color='inherit'>
                        Opções 
                    </Button>
                </Stack>
            </React.Fragment>
        )
    }

    changeMenu (menustate) {

        this.setState({
            ...this.state,
            menustate: menustate 
        })

        //console.log(this.state)
    }

    render () {
        return (
            <AppBar color='primary' component='nav'>
                <Toolbar>
                    <Submenu changeMenu={this.changeMenu}></Submenu>
                    {
                        (this.state.menustate === 'USERS') ?
                            this.showUsersbuttons()
                        : (this.state.menustate === 'PROCS') ?
                            this.showProceduresButtons()  
                        : (this.state.menustate === 'PAT') ?
                            this.showPatiantbuttons() : null
                    }
                    <Grid container alignItems="center" direction='row-reverse'>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="R" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}