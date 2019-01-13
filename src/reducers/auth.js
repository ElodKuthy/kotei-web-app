import { Base64 } from 'js-base64'
import actions from '../actions'

function parseToken(jwt) {
    try {
        const { role, ...rest } = JSON.parse(Base64.decode((jwt).split('.')[1]))
        return {
            ...rest,
            roles: [{
                gymId: 1,
                selected: true,
                admin: role === 'admin',
                coach: role === 'coach',
                client: role === 'client',
            }],
        }
    } catch (err) {
        console.error(err)
        return {}
    }
}

export default function auth(state = { ...parseToken(localStorage.getItem('jwt')) }, action) {
    switch (action.type) {
        case actions.LOGIN_REQUESTED:
        case actions.LOGOUT_REQUESTED:
        case actions.LOGOUT_SUCCEEDED:
            return { roles: [] }
        case actions.LOGIN_SUCCEEDED:
            return {
                ...parseToken(action.payload.jwt),
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
