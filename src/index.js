import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './firebase'
import './i18n'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
