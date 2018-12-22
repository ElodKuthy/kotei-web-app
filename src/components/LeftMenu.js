import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import { toggleMenu, changeSelectedGym } from '../actions'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export const drawerWidth = 240

export const LEFT_MENU_ID = 'left-menu'
const GYM_SELECTOR_MENU_ID = 'top-bar--gym-selector-menu'


const styles = theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: {
        ...theme.mixins.toolbar,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
})


class LeftMenu extends Component {

    state = {
        adminOpen: false,
    }

    gymSelectorButton = React.createRef()

    handleDrawerToggle = () => {
        this.props.toggleMenu(LEFT_MENU_ID)
    }

    toggleGymSelectorMenu = () => {
        this.props.toggleMenu(GYM_SELECTOR_MENU_ID)
    }


    onGymSelectorMenuItemClick = (id) => () => {
        this.props.changeSelectedGym(id)
        this.toggleGymSelectorMenu()
    }

    onAdminClick = () => {
        this.setState({ adminOpen: !this.state.adminOpen })
    }

    render() {
        const { t, classes, user, menu, companies, gymId } = this.props
        if (!user) {
            return null
        } 
        const { adminOpen } = this.state
        const isOpen = menu === LEFT_MENU_ID
        const gymSelectorOpen = menu === GYM_SELECTOR_MENU_ID
        const gyms = companies.reduce((acc, { name, gyms }) => acc.concat(gyms.map(gym => ({ ...gym, company: name }))), [])
        const selectedGym = gyms.find(({ id }) => id === gymId)

        const drawer = (
            <div>
                <div className={classes.toolbar}>
                    <div ref={this.gymSelectorButton}>
                        { gyms && gyms.length && selectedGym ? <Button 
                            aria-owns={gymSelectorOpen ? GYM_SELECTOR_MENU_ID : undefined}
                            aria-haspopup="true"
                            onClick={this.toggleGymSelectorMenu}
                            color="inherit"
                        >
                            {selectedGym.company} - {selectedGym.name}<ExpandMore />
                        </Button> : null}
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
                    open={gymSelectorOpen}
                    onClose={this.toggleGymSelectorMenu}
                    >
                    {gyms && gyms.length ? gyms.map(({ company, name, id }) =>
                        <MenuItem key={`${company}-${name}`} onClick={this.onGymSelectorMenuItemClick(id)}>{company} - {name}</MenuItem>) : null}
                    </Menu>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={this.onAdminClick}>
                        <ListItemText primary={t('Administration')} />
                        {adminOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemText primary={t('Users')} />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        )
        
        return (
            <nav className={classes.drawer}>
                <Hidden smUp>
                    <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor="left"
                        open={isOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown>
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
          </nav>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    menu: state.display.menu,
    companies: state.data.companies,
    gymId: state.selection.gym,
})
  
const mapDispatchToProps = {
    toggleMenu,
    changeSelectedGym,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withNamespaces()(LeftMenu)))