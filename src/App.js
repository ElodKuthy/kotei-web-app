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

function Home() {
  return <div>Secret</div>
}

function App() {
  return (
    <Provider store={store}>
    <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <FirebaseObserver />
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route render={() => (<div>404</div>)} />
          </Switch>  
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
