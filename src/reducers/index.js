import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'

export default function createRootReducer(history) {
    return combineReducers({
        auth,
        router: connectRouter(history),
    })
}
