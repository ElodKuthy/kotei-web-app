import actions from '../actions'

export default function auth(state = { user: null, error: null }, action) {
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
        case actions.LOGIN_FAILED:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state
    }
}
