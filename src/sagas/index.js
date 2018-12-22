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

function* getCompanies() {
   try {
      const companies = yield call(service.getCompanies)
      yield put({ type: actions.COMPANIES_LOADED, payload: companies })
   } catch (error) {
      // TODO: error
   }
}

export default function* rootSaga() {
   yield takeLatest(actions.LOGIN_REQUESTED, login)
   yield takeLatest(actions.COMPANIES_REQUESTED, getCompanies)
}
