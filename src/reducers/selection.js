import actions from '../actions'

export default function auth(state = {}, action) {
    switch (action.type) {
        case actions.CHANGE_SELECTED_GYM:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
