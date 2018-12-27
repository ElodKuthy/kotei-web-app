import actions from '../actions'

export default function auth(state = { id: null, error: null }, action) {
    switch (action.type) {
        case actions.LOGIN_REQUESTED:
            return {
                id: null,
                error: null,
            }
        case actions.LOGIN_SUCCEEDED:
            return {
                id: action.payload.uid,
                email: action.payload.email,
                error: null,
            }
        case actions.LOGOUT_REQUESTED:
        case actions.LOGOUT_SUCCEEDED:
            return {
                id: null,
                error: null,
            }
        case actions.LOGIN_FAILED:
            return {
                id: null,
                error: action.error,
            }
        case actions.CURRENT_USER_LOADED:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
