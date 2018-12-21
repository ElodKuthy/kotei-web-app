import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { login } from '../actions'
import { red } from '@material-ui/core/colors'
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    error: {
      marginTop: theme.spacing.unit * 2,
      color: red[500],
    },
})

class Login extends Component {

  state = {
    email: '',
    password: '',
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { login } = this.props
    const { email, password } = this.state
    login(email, password)
  }

  render() {
    const { classes, user, error, from } = this.props
    const { email, password } = this.state

    if (user) {
      return <Redirect to={from} />
    }

    return (
        <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bejelentkezés
          </Typography>
          <form className={classes.form} noValidate>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email cím</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus value={email} onChange={this.onEmailChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Jelszó</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" value={password} onChange={this.onPasswordChange} />
            </FormControl>
            { error && <Typography className={classes.error}>{error}</Typography> }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
              disabled={!email || !password}
            >
              Bejelentkezés
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error && state.auth.error.message,
  from: state.router.location.state ? state.router.location.state.from : { pathname: '/' }
})

const mapDispatchToProps =  {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))
