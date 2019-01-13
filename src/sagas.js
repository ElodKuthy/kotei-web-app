import { call, put, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import * as service from './service'

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

function* getLocations(action) {
   try {
      const locations = yield call(service.getLocations, action.payload.gymId)
      yield put({ type: actions.LOCATIONS_LOADED, payload: locations })
   } catch (error) {
      console.log(error)
      // TODO: error
   }
}

function* getTrainingTypes(action) {
   try {
      const trainingTypes = yield call(service.getTrainingTypes, action.payload.gymId)
      yield put({ type: actions.TRAINING_TYPES_LOADED, payload: trainingTypes })
   } catch (error) {
      console.log(error)
      // TODO: error
   }
}

function* getCoaches(action) {
   try {
      const coaches = yield call(service.getCoaches, action.payload.gymId)
      yield put({ type: actions.COACHES_LOADED, payload: coaches })
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
   yield takeLatest(actions.USER_ROLES_REQUESTED, getRoles)
   yield takeLatest(actions.LOCATIONS_REQUESTED, getLocations)
   yield takeLatest(actions.TRAINING_TYPES_REQUESTED, getTrainingTypes)
   yield takeLatest(actions.TRAININGS_REQUESTED, getTrainings)
   yield takeLatest(actions.COACHES_REQUESTED, getCoaches)
}
