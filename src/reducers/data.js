import actions from '../actions'

export default function auth(state = { gyms: [] }, action) {
    switch (action.type) {
        case actions.GYMS_LOADED:
            return {
                ...state,
                gyms: action.payload || [],
            }
        default:
            return state
    }
}
