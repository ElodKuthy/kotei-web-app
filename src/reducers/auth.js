import actions from '../actions'

export default function auth(state = { roles: [] }, action) {
    switch (action.type) {
        case actions.LOGIN_REQUESTED:
        case actions.LOGOUT_REQUESTED:
        case actions.LOGOUT_SUCCEEDED:
            return { roles: [] }
        case actions.LOGIN_SUCCEEDED:
            return {
                uid: action.payload.uid,
                email: action.payload.email,
                roles: [],
            }
        case actions.LOGIN_FAILED:
            return {
                error: action.error,
                roles: [],
            }
        case actions.USER_ROLES_LOADED:
            return {
                ...state,
                roles: action.payload,
            }
        default:
            return state
    }
}
