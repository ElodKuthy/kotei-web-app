import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import theme from './theme'
import store, { history } from './store'

function App() {
  return (
    <Provider store={store}>
    <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route exact path="/" render={() => (<Typography variant="h1" align="center" gutterBottom>Kotei web app</Typography>)} />
            <Route render={() => (<div>404</div>)} />
          </Switch>  
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
