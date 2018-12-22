import actions from '../actions'

export default function auth(state = { user: null, error: null, userData: null, }, action) {
    switch (action.type) {
        case actions.LOGIN_REQUESTED:
            return {
                ...state,
                user: null,
                error: null,
            }
        case actions.LOGIN_SUCCEEDED:
            return {
                ...state,
                user: action.payload,
            }
        case actions.LOGOUT_REQUESTED:
        case actions.LOGOUT_SUCCEEDED:
            return {
                ...state,
                user: null,
                error: null,
            }
        case actions.LOGIN_FAILED:
            return {
                ...state,
                error: action.error,
            }
        case actions.CURRENT_USER_LOADED:
            return {
                ...state,
                userData: action.payload,
            }
        default:
            return state
    }
}
