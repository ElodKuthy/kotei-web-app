const actions = {
    LOGIN_REQUESTED: 'LOGIN_REQUESTED',
    LOGIN_SUCCEEDED: 'LOGIN_SUCCEEDED',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGOUT_REQUESTED: 'LOGOUT_REQUESTED',
    LOGOUT_SUCCEEDED: 'LOGOUT_SUCCEEDED',
    TOGGLE_MENU: 'TOOGLE_MENU',
    GYMS_REQUESTED: 'GYMS_REQUESTED',
    GYMS_LOADED: 'GYMS_LOADED',
    CHANGE_SELECTED_GYM: 'CHANGE_SELECTED_GYM',
    USER_ROLES_REQUESTED: 'USER_ROLES_REQUESTED',
    USER_ROLES_LOADED: 'USER_ROLES_LOADED',
    LOCATIONS_REQUESTED: 'LOCATIONS_REQUESTED',
    LOCATIONS_LOADED: 'LOCATIONS_LOADED',
    TRAINING_TYPES_REQUESTED: 'TRAINING_TYPES_REQUESTED',
    TRAINING_TYPES_LOADED: 'TRAINING_TYPES_LOADED',
    TRAININGS_REQUESTED: 'TRAININGS_REQUESTED',
    TRAININGS_LOADED: 'TRAININGS_LOADED',
    COACHES_REQUESTED: 'COACHES_REQUESTED',
    COACHES_LOADED: 'COACHES_LOADED',
}

export default actions

export function login(email, password) {
    return {
        type: actions.LOGIN_REQUESTED,
        payload: { email, password },
    }
}

export function logout() {
    return {
        type: actions.LOGOUT_REQUESTED,
    }
}

export function toggleMenu(id) {
    return {
        type: actions.TOGGLE_MENU,
        payload: { id },
    }
}

export function fetchGyms() {
    return {
        type: actions.GYMS_REQUESTED,
    }
}

export function changeSelectedGym(selection) {
    return {
        type: actions.CHANGE_SELECTED_GYM,
        payload: selection,
    }
}

export function fetchUserRoles(uid) {
    return {
        type: actions.USER_ROLES_REQUESTED,
        payload: { uid }
    }
}

export function fetchLocations(gymId) {
    return {
        type: actions.LOCATIONS_REQUESTED,
        payload: { gymId }
    }
}

export function fetchTrainingTypes(gymId) {
    return {
        type: actions.TRAINING_TYPES_REQUESTED,
        payload: { gymId }
    }
}

export function fetchCoaches(gymId) {
    return {
        type: actions.COACHES_REQUESTED,
        payload: { gymId }
    }
}

export function fetchTrainings(gymId, from, to) {
    return {
        type: actions.TRAININGS_REQUESTED,
        payload: { gymId, from, to }
    }
}
