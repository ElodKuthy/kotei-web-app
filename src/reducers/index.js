import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import data from './data'
import display from './display'
import schedule from './schedule'
import selection from './selection'

export default function createRootReducer(history) {
    return combineReducers({
        auth,
        data,
        display,
        router: connectRouter(history),
        schedule,
        selection,
    })
}
