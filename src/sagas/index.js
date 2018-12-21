import { call, put, takeLatest } from 'redux-saga/effects'
import actions from '../actions'
import * as service from '../service'

function* login(action) {
   try {
      const { user } = yield call(service.login, action.payload.email, action.payload.password)
      yield put({ type: actions.LOGIN_SUCCEEDED, payload: user })
   } catch (error) {
      yield put({ type: actions.LOGIN_FAILED, error })
   }
}

export default function* rootSaga() {
    yield takeLatest(actions.LOGIN_REQUESTED, login)
}
