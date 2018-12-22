import actions from '../actions'

export default function auth(state = { gym: 'FaJS5VoMkSTO6QMW7IHi' }, action) {
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
