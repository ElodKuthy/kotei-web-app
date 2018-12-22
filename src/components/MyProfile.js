import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { fetchCurrentUserData } from '../actions'

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 3,
        [theme.breakpoints.up('lg')]: {
            width: 1200,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        padding: theme.spacing.unit * 2,
    }
})

class MyProfile extends Component {
   
    componentDidMount = () => {
        this.props.fetchCurrentUserData(this.props.user.uid)
    }

    render() {
        const { t, classes, user, userData } = this.props

        if (!userData) {
            return null
        }
         
        return (
            <div className={classes.root}>
                <Grid container justify="center" spacing={24}>
                    <Grid item xs={12} sm={9} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="body1" gutterBottom>{t('Name')}: {userData.name}</Typography>
                            <Typography variant="body1" gutterBottom>{t('Email')}: {user.email}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    userData: state.auth.userData,
})
  
const mapDispatchToProps = {
    fetchCurrentUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withNamespaces()(MyProfile)))