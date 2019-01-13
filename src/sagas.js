import { call, put, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import * as service from './service'

function* login(action) {
   try {
      const jwt = yield call(service.login, action.payload.email, action.payload.password)
      yield put({ type: actions.LOGIN_SUCCEEDED, payload: { jwt }})
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

function* getTrainings(action) {
   try {
      const trainings = yield call(service.getTrainings, action.payload.gymId, action.payload.from, action.payload.to)
      yield put({ type: actions.TRAININGS_LOADED, payload: trainings })
   } catch (error) {
      console.log(error)
      // TODO: error
   }
}

export default function* rootSaga() {
   yield takeLatest(actions.LOGIN_REQUESTED, login)
   yield takeLatest(actions.LOGOUT_REQUESTED, logout)
   yield takeLatest(actions.GYMS_REQUESTED, getGyms)
   yield takeLatest(actions.TRAININGS_REQUESTED, getTrainings)
}
