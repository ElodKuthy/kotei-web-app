import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { toggleMenu, fetchCompanies, changeSelectedGym } from '../actions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const GYM_SELECTOR_MENU_ID = 'gym-selector-menu'

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
};

class TopAppBar extends Component {

  gymSelectorButton = React.createRef()

  toggleGymSelectorMenu = () => {
    this.props.toggleMenu(GYM_SELECTOR_MENU_ID)
  }

  onGymSelectorMenuItemClick = (id) => () => {
    this.props.changeSelectedGym(id)
    this.toggleGymSelectorMenu()
  }

  componentDidMount = () => {
    this.props.fetchCompanies()
  }

  render () {
    const { classes, user, menu, companies, gymId } = this.props
    if (!user) {
      return null
    }
    const gymSelectorOpen = menu === GYM_SELECTOR_MENU_ID
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
            <Typography color="inherit">{user.email}</Typography>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopAppBar))
