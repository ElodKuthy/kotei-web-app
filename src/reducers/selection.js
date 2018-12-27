import actions from '../actions'

export default function auth(state = { gym: 'u2Y12OdY3PNOizC0ps7C' }, action) {
    switch (action.type) {
        case actions.CHANGE_SELECTED_GYM:
            return {
                ...state,
                gym: action.payload,
            }
        default:
            return state
    }
}
