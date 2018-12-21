import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './firebase'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
