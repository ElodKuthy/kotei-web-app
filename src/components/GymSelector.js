import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleMenu, changeSelectedGym } from '../actions'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const GYM_SELECTOR_MENU_ID = 'top-bar--gym-selector-menu'

class GymSelector extends Component {

    state = {
        open: false,
    }

    gymSelectorButton = React.createRef()

    toggleGymSelectorMenu = () => {
        this.setState(({ open }) => ({ open: !open }))
    }

    onGymSelectorMenuItemClick = (id) => () => {
        this.props.changeSelectedGym(id)
        this.toggleGymSelectorMenu()
    }

    render() {
        const { className, userId, roles, selectedGymId } = this.props
        const { open } = this.state
        
        if (!userId) {
            return null
        } 
        
        const gyms = this.props.gyms.filter(gym => roles.find(role => role.gymId === gym.id))
        const selectedGym = gyms.find(({ id }) => id === selectedGymId)

        return (
            <div className={className}>
                <div ref={this.gymSelectorButton}>
                    {selectedGym && <Button 
                        aria-owns={open ? GYM_SELECTOR_MENU_ID : undefined}
                        aria-haspopup="true"
                        onClick={this.toggleGymSelectorMenu}
                        color="inherit"
                    >
                        {selectedGym.name}<ExpandMore />
                    </Button>}
                </div>
                <Menu
                id={GYM_SELECTOR_MENU_ID}
                anchorEl={this.gymSelectorButton.current}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={this.toggleGymSelectorMenu}
                >
                {gyms.map(({ name, id }) =>
                    <MenuItem key={name} onClick={this.onGymSelectorMenuItemClick(id)}>{name}</MenuItem>)}
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.uid,
    roles: state.auth.roles,
    gyms: state.data.gyms,
    selectedGymId: state.selection.gym,
})
  
const mapDispatchToProps = {
    toggleMenu,
    changeSelectedGym,
}

export default connect(mapStateToProps, mapDispatchToProps)(GymSelector)