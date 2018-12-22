import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { drawerWidth } from './LeftMenu'

const styles = theme => ({
    root: {
        
    },
    toolbar: theme.mixins.toolbar,
    container: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth
        },
        padding: theme.spacing.unit * 3,
    },
})

function ContentContainer({ classes, children }) {
    return (
        <main className={classes.root}>
            <div className={classes.toolbar} />
            <div className={classes.container}>
                {children}
            </div>
        </main>
    )
}

export default withStyles(styles)(ContentContainer)
