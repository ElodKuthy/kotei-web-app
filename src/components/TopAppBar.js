import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { toggleMenu, fetchCompanies, changeSelectedGym, logout } from '../actions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'

const GYM_SELECTOR_MENU_ID = 'top-bar--gym-selector-menu'
const USER_MENU_ID = 'top-bar--user-menu'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    textDecoration: 'none',
    outline: 'none',
  }
};

class TopAppBar extends Component {

  gymSelectorButton = React.createRef()
  userMenuButton = React.createRef()

  toggleGymSelectorMenu = () => {
    this.props.toggleMenu(GYM_SELECTOR_MENU_ID)
  }

  toggleUserMenu = () => {
    this.props.toggleMenu(USER_MENU_ID)
  }

  onGymSelectorMenuItemClick = (id) => () => {
    this.props.changeSelectedGym(id)
    this.toggleGymSelectorMenu()
  }

  onLogoutClick = () => {
    this.toggleUserMenu()
    this.props.logout()
  }

  componentDidMount = () => {
    this.props.fetchCompanies()
  }

  render () {
    const { t, classes, user, menu, companies, gymId } = this.props
    if (!user) {
      return null
    }
    const gymSelectorOpen = menu === GYM_SELECTOR_MENU_ID
    const userMenuOpen = menu === USER_MENU_ID
    const gyms = companies.reduce((acc, { name, gyms }) => acc.concat(gyms.map(gym => ({ ...gym, company: name }))), [])
    const selectedGym = gyms.find(({ id }) => id === gymId)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <div ref={this.gymSelectorButton}>
              { gyms && gyms.length && selectedGym ? <Button 
                aria-owns={gymSelectorOpen ? GYM_SELECTOR_MENU_ID : undefined}
                aria-haspopup="true"
                onClick={this.toggleGymSelectorMenu}
                color="inherit"
              >
                {selectedGym.company} - {selectedGym.name}<ExpandMoreIcon />
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
              id={GYM_SELECTOR_MENU_ID}
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  menu: state.display.menu,
  companies: state.data.companies,
  gymId: state.selection.gym,
})

const mapDispatchToProps =  {
  toggleMenu,
  fetchCompanies,
  changeSelectedGym,
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withNamespaces()(TopAppBar)))
