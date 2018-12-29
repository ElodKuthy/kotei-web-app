import React, { Component } from 'react'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
        maxWidth: 1280,
    },
    paper: {
        padding: theme.spacing.unit * 2,
    }
})

class MyProfile extends Component {
   
    render() {
        if (!this.props.userId) {
            return null
        }

        const { t, classes, name, email } = this.props
         
        return (           
            <Grid className={classes.root} container justify="center" spacing={24}>
                <Grid item xs={12} sm={9} md={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="body1" gutterBottom>{t('Name')}: {name}</Typography>
                        <Typography variant="body1" gutterBottom>{t('Email')}: {email}</Typography>
                    </Paper>
                </Grid>
            </Grid>           
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.uid,
    name: state.selection.name,
    email: state.auth.email,
})

export default connect(mapStateToProps)(withStyles(styles)(withNamespaces()(MyProfile)))