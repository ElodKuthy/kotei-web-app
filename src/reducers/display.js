import actions from '../actions'

export default function auth(state = { menu: null }, action) {
    switch (action.type) {
        case actions.TOGGLE_MENU:
            return {
                ...state,
                menu: state.menu === action.payload.id ? null : action.payload.id,
            }
        default:
            return state
    }
}
