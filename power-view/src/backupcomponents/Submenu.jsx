import * as React from 'react';

// MaterialUI Components
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default class MenuPopupState extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            meters: ['meter01','meter02']
        }
    }

    componentDidMount () {
        // TODO
        // fetch available meters from database
    }

    render() {

        const { meters } = this.state
       
        return (
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <IconButton variant="contained" {...bindTrigger(popupState)}>
                      <MenuIcon/>
                </IconButton>

                <Menu {...bindMenu(popupState)}>
                {
                    meters.map(meter => (
                        <MenuItem key={meter} onClick={() => {
                            this.props.changeMenu({meter})
                            popupState.close()
                        }}>{meter}</MenuItem>))
                }
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        );
    }
}