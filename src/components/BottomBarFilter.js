import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { toggleMenu, changeScheduleRange } from '../actions'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FilterList from '@material-ui/icons/FilterList'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Done from '@material-ui/icons/Done'
import ListSubheader from '@material-ui/core/ListSubheader'
import { SCHEDULE_RANGE_TYPES } from '../consts'

const BOTTOM_BAR_FILTER_MENU_ID = 'bottom-bar--filter-menu'

class GymSelector extends Component {

    state = {
        open: false,
    }

    filterButton = React.createRef()

    toggleFilterMenu = () => {
        this.setState(({ open }) => ({ open: !open }))
    }

    changeScheduleRange = (range) => () => {
        this.props.changeScheduleRange(range)
        this.toggleFilterMenu()
    }

    render() {                
        const { t, range } = this.props
        const { open } = this.state

        return (
            <div>
                <div ref={this.filterButton}>
                    <IconButton 
                        aria-owns={open ? BOTTOM_BAR_FILTER_MENU_ID : undefined}
                        aria-haspopup="true"
                        onClick={this.toggleFilterMenu}
                    >
                        <FilterList />
                    </IconButton>
                </div>
                <Menu
                    id={BOTTOM_BAR_FILTER_MENU_ID}
                    anchorEl={this.filterButton.current}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={open}
                    onClose={this.toggleFilterMenu}
                >
                    <ListSubheader>{t('Training type')}</ListSubheader>
                    <MenuItem selected>
                        <ListItemIcon>
                            <Done color="secondary" />
                        </ListItemIcon>
                        <ListItemText inset primary={t('All types')} />
                    </MenuItem>
                    <MenuItem>
                        <ListItemText inset primary={t('Csoportos edzés')} />
                    </MenuItem>
                    <MenuItem>
                        <ListItemText inset primary={t('Személyi edzés')} />
                    </MenuItem>
                    <Divider />
                    <ListSubheader>{t('View type')}</ListSubheader>
                    <MenuItem selected={range === SCHEDULE_RANGE_TYPES.day} onClick={this.changeScheduleRange(SCHEDULE_RANGE_TYPES.day)}>
                        {range === SCHEDULE_RANGE_TYPES.day && <ListItemIcon><Done color="secondary" /></ListItemIcon>}
                        <ListItemText inset primary={t('Daily view')} />
                    </MenuItem>
                    <MenuItem selected={range === SCHEDULE_RANGE_TYPES.week} onClick={this.changeScheduleRange(SCHEDULE_RANGE_TYPES.week)}>
                        {range === SCHEDULE_RANGE_TYPES.week && <ListItemIcon><Done color="secondary" /></ListItemIcon>}
                        <ListItemText inset primary={t('Weekly view')} />
                    </MenuItem>
                    <MenuItem selected={range === SCHEDULE_RANGE_TYPES.month} onClick={this.changeScheduleRange(SCHEDULE_RANGE_TYPES.month)}>
                        {range === SCHEDULE_RANGE_TYPES.month && <ListItemIcon><Done color="secondary" /></ListItemIcon>}
                        <ListItemText inset primary={t('Monthly view')} />
                    </MenuItem>
                    <Divider />
                    <ListSubheader>{t('Training filter')}</ListSubheader>
                    <MenuItem selected>
                        <ListItemIcon>
                            <Done color="secondary" />
                        </ListItemIcon>
                        <ListItemText inset primary={t('All trainings')} />
                    </MenuItem>
                    <MenuItem>
                        <ListItemText inset primary={t('Just my trainings')} />
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    range: state.schedule.range,
})
  
const mapDispatchToProps = {
    toggleMenu,
    changeScheduleRange,
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(GymSelector))