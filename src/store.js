import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './reducers'
import rootSaga from './sagas'

export const history = createBrowserHistory()
export const sagaMiddleware = createSagaMiddleware()

const store = createStore(createRootReducer(history), composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store
