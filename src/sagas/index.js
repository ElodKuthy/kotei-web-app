import { call, put, takeLatest } from 'redux-saga/effects'
import actions from '../actions'
import * as service from '../service'

function* login(action) {
   try {
      yield call(service.login, action.payload.email, action.payload.password)
   } catch (error) {
      yield put({ type: actions.LOGIN_FAILED, error })
   }
}

function* logout() {
   try {
      yield call(service.logout)
   } catch (error) {
      console.log(error)
      // TODO: error      
   }
}

function* getGyms() {
   try {
      const gyms = yield call(service.getGyms)
      yield put({ type: actions.GYMS_LOADED, payload: gyms })
   } catch (error) {
      console.log(error)
      // TODO: error
   }
}

function* getRoles(action) {
   try {
      const roles = yield call(service.getRoles, action.payload.uid)
      yield put({ type: actions.USER_ROLES_LOADED, payload: roles })
   } catch (error) {
      console.log(error)
      // TODO: error
   }
}

export default function* rootSaga() {
   yield takeLatest(actions.LOGIN_REQUESTED, login)
   yield takeLatest(actions.LOGOUT_REQUESTED, logout)
   yield takeLatest(actions.GYMS_REQUESTED, getGyms)
   yield takeLatest(actions.USER_ROLES_REQUESTED, getRoles)
}
