import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { drawerWidth } from './LeftMenu'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Today from '@material-ui/icons/Today'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Tooltip from '@material-ui/core/Tooltip'
import Link from 'react-router-dom/Link'
import moment from 'moment'

const styles = theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    withDrawer: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    toolbar: {
        alignItems: 'center',
    },
    grow: {
        flexGrow: 1,
    },
    link: {
        color: 'inherit',
    }
})

const previousTooltips = {
    day: 'Previous day',
    week: 'Previous week',
    month: 'Previous month',
}

const todayTooltips = {
    day: 'Today',
    week: 'This week',
    month: 'This month',
}

const nextTooltips = {
    day: 'Next day',
    week: 'Next week',
    month: 'Next month',
}

class BottomBar extends Component {

    render() {
        const { t, classes, admin, coach, range, value } = this.props
        const now = moment()
        const todayValues = {
            day: now.dayOfYear(),
            week: now.isoWeek(),
            month: now.month(),
        }

        return (
            <AppBar position="fixed" color="primary" className={classNames(classes.appBar, { [classes.withDrawer]: coach || admin })}>
                <Toolbar className={classes.toolbar}>

                    <div className={classes.grow} />
                    <Tooltip title={t(previousTooltips[range])}>
                        <Link className={classes.link} to={`/schedule/${range}/${parseInt(value, 10) - 1}`}>
                            <IconButton color="inherit">
                                <ChevronLeft />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title={t(todayTooltips[range])}>
                        <Link className={classes.link} to={`/schedule/${range}/${todayValues[range]}`}>
                            <IconButton color="inherit">
                                <Today />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title={t(nextTooltips[range])}>
                        <Link className={classes.link} to={`/schedule/${range}/${parseInt(value, 10) + 1}`}>
                            <IconButton color="inherit">
                                <ChevronRight />
                            </IconButton>
                        </Link>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    coach: state.selection.coach,
    admin: state.selection.admin,
})
  
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withNamespaces()(BottomBar)))
