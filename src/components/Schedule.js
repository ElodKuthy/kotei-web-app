import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import { fetchTrainings } from '../actions'
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
        const { gymId, fetchTrainings, from, to } = this.props
        fetchTrainings(gymId, from, to)
    }

    renderDay = () => {
        const { classes, trainings, from } = this.props
        const locations = trainings.reduce((acc, curr) => {
            if (!acc.find(item => item.id === curr.Location.id)) {
                acc.push(curr.Location)
            }
            return acc
        }, [])
        return (
            <div>
                <Typography variant="h4" gutterBottom>{moment(from).locale('hu').format('LLLL').replace(' 0:00', '')}</Typography><br />
                {locations.map(location => {
                    const trainingsOnLocation = trainings.filter(training => training.Location.id === location.id)
                    return !!trainingsOnLocation.length && (
                        <div key={location.id}>
                            <Typography variant="h4" gutterBottom>{location.name}</Typography> 
                            {trainingsOnLocation.map(training => (
                                <div key={training.id}>
                                    <Typography variant="h6">{moment(training.from).locale('hu').format('LT')}</Typography>
                                    <Paper className={classes.paper}>
                                        <Typography variant="body1">{training.TrainingType.name}</Typography>
                                        <Typography variant="body1">{training.Coach.nickname || training.Coach.fullName}</Typography>
                                        {training.max 
                                            ? <Typography variant="body1">{Math.round(training.utilization * training.max / 100)} / {training.max}</Typography>
                                            : <Typography variant="body1">{training.utilization}%</Typography>
                                        }
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
        const { gymId, range, from, to } = this.props
        if (prevProps.gymId !== gymId
            || prevProps.range !== range
            || prevProps.from !== from
            || prevProps.to !== to
        ) {
            this.fetchTrainings()
        }
    }

    componentDidMount = () => {
        this.fetchTrainings()
    }

    render() {
        const { range } = this.props
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
                <BottomBar />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    gymId: state.selection.gymId,
    trainings: state.data.trainings,
    range: state.schedule.range,
    from: state.schedule.from,
    to: state.schedule.to,
})
  
const mapDispatchToProps = {
    fetchTrainings,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withNamespaces()(Schedule)))
