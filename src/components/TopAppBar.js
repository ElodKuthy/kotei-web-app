import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { toggleMenu, fetchGyms, changeSelectedGym, logout } from '../actions'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'
import { drawerWidth, LEFT_MENU_ID } from './LeftMenu'

const USER_MENU_ID = 'top-bar--user-menu'

const styles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    outline: 'none',
  }
})

class TopAppBar extends Component {

  userMenuButton = React.createRef()

  toggleUserMenu = () => {
    this.props.toggleMenu(USER_MENU_ID)
  }

  onLogoutClick = () => {
    this.toggleUserMenu()
    this.props.logout()
  }

  onLeftMenuButtonClick = () => {
    this.props.toggleMenu(LEFT_MENU_ID)
  }

  componentDidMount = () => {
    this.props.fetchGyms()
  }

  render () {
    const { t, classes, userId, menu } = this.props
    if (!userId) {
      return null
    }
    const userMenuOpen = menu === USER_MENU_ID
    return (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Menu"
              onClick={this.onLeftMenuButtonClick}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            <div ref={this.userMenuButton}>
              <IconButton
                aria-owns={userMenuOpen ? USER_MENU_ID : undefined}
                aria-haspopup="true"
                onClick={this.toggleUserMenu} 
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <Menu
              id={USER_MENU_ID}
              anchorEl={this.userMenuButton.current}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={userMenuOpen}
              onClose={this.toggleUserMenu}
            >
              <Link className={classes.link} to="/profile" onClick={this.toggleUserMenu}><MenuItem>{t('My profile')}</MenuItem></Link>
              <MenuItem onClick={this.onLogoutClick}>{t('Logout')}</MenuItem>
            </Menu>
          </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.uid,
  menu: state.display.menu,
})

const mapDispatchToProps =  {
  toggleMenu,
  fetchGyms,
  changeSelectedGym,
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withNamespaces()(TopAppBar)))
