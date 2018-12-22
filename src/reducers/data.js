import actions from '../actions'

export default function auth(state = { companies: [] }, action) {
    switch (action.type) {
        case actions.COMPANIES_LOADED:
            return {
                ...state,
                companies: action.payload,
            }
        default:
            return state
    }
}
