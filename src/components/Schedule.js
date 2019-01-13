import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import { fetchLocations, fetchTrainingTypes, fetchCoaches, fetchTrainings } from '../actions'
import moment from 'moment'
import 'moment/locale/hu'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import BottomBar from './BottomBar'

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
    },
})

class Schedule extends Component {

    fetchTrainings = () => {
        const { gymId, fetchTrainings, match: { params: { range, value } } } = this.props
        let from = moment().startOf('isoWeek').toDate()
        let to = moment().endOf('isoWeek').toDate()
        switch (range) {
            case 'month':
                from = moment().month(value).startOf('month').toDate()
                to = moment().month(value).endOf('month').toDate()
                break
            case 'week':
                from = moment().isoWeek(value).startOf('isoWeek').toDate()
                to = moment().isoWeek(value).endOf('isoWeek').toDate()
                break
            case 'day':
                from = moment().dayOfYear(value).startOf('day').toDate()
                to = moment().dayOfYear(value).endOf('day').toDate()
                break
            default:
                break
        }
        fetchTrainings(gymId, from, to)
    }

    renderDay = () => {
        const { classes, locations, trainings, match: { params: { value } } } = this.props
        const day = value ? moment().dayOfYear(value).startOf('day') : moment().startOf('day')
        return (
            <div>
                <Typography variant="h4" gutterBottom>{day.locale('hu').format('LLLL').replace(' 0:00', '')}</Typography><br />
                {locations.map(location => {
                    const trainingsOnLocation = trainings.filter(training => training.location === location.id)
                    return !!trainingsOnLocation.length && (
                        <div key={location.id}>
                            <Typography variant="h4" gutterBottom>{location.name}</Typography> 
                            {trainingsOnLocation.map(training => (
                                <div key={training.id}>
                                    <Typography variant="h6">{moment.unix(training.from.seconds).locale('hu').format('LT')}</Typography>
                                    <Paper className={classes.paper}>
                                        <Typography variant="body1">{training.name}</Typography>
                                        <Typography variant="body1">{training.coach.alias || training.coach.name}</Typography>
                                        <Typography variant="body1">{training.current} / {training.max}</Typography>
                                    </Paper>
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        )
    }

    renderWeek = () => {
        return (
            <div></div>
        )
    }

    renderMonth = () => {
        return (
            <div></div>
        )
    }

    componentDidUpdate = (prevProps) => {
        const { gymId, fetchLocations, fetchTrainingTypes, fetchCoaches, match: { params: { range, value } } } = this.props
        if (prevProps.gymId !== gymId) {
            fetchLocations(gymId)
            fetchTrainingTypes(gymId)
            fetchCoaches(gymId)
            this.fetchTrainings()
        }
        if (prevProps.match.params.range !== range || prevProps.match.params.value !== value) {
            this.fetchTrainings()
        }
    }

    render() {
        const { match: { params: { range = 'week', value = moment().isoWeek() } } } = this.props
        let schedule
        switch (range) {
            case 'month':
                schedule = this.renderMonth()
                break
            case 'day':
                schedule = this.renderDay()
                break
            case 'week':
            default:
                schedule = this.renderWeek()
        }

        return (
            <Fragment>
                {schedule}
                <BottomBar range={range} value={value} />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    gymId: state.selection.gymId,
    locations: state.data.locations,
    trainings: state.data.trainings,
})
  
const mapDispatchToProps = {
    fetchLocations,
    fetchTrainingTypes,
    fetchCoaches,
    fetchTrainings,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withNamespaces()(Schedule)))
