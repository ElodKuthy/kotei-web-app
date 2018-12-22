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

function* logout(action) {
   try {
      yield call(service.logout)
      yield put({ type: actions.LOGOUT_SUCCEEDED })
   } catch (error) {

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

function* getCurrentUser(action) {
   try {
      const user = yield call(service.getUser, action.payload.uid)
      yield put({ type: actions.CURRENT_USER_LOADED, payload: user })
   } catch (error) {
      // TODO: error
   }
}

export default function* rootSaga() {
   yield takeLatest(actions.LOGIN_REQUESTED, login)
   yield takeLatest(actions.LOGOUT_REQUESTED, logout)
   yield takeLatest(actions.COMPANIES_REQUESTED, getCompanies)
   yield takeLatest(actions.CURRENT_USER_REQUESTED, getCurrentUser)
}
