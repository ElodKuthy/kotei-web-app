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
import { toggleMenu } from '../actions'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import GymSelector from './GymSelector'

export const drawerWidth = 240

export const LEFT_MENU_ID = 'left-menu'

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

    onAdminClick = () => {
        this.setState({ adminOpen: !this.state.adminOpen })
    }

    render() {
        const { t, classes, userId, menu } = this.props
        if (!userId) {
            return null
        } 
        const { adminOpen } = this.state
        const isOpen = menu === LEFT_MENU_ID

        const drawer = (
            <div>
                <GymSelector className={classes.toolbar} />
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
    userId: state.auth.uid,
    menu: state.display.menu,
})
  
const mapDispatchToProps = {
    toggleMenu,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withNamespaces()(LeftMenu)))