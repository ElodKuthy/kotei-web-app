import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import theme from './theme'
import store, { history } from './store'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import FirebaseObserver from './components/FirebaseObserver'
import TopAppBar from './components/TopAppBar'
import MyProfile from './components/MyProfile'

const Empty = () => <div />

function App() {
  return (
    <Provider store={store}>
    <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <FirebaseObserver />
          <TopAppBar />
          <Switch>
            <PrivateRoute exact path="/" component={Empty} />
            <PrivateRoute exact path="/profile" component={MyProfile} />
            <Route exact path="/login" component={Login} />
            <Route render={() => (<div>404</div>)} />
          </Switch>  
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
