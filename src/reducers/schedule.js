import moment from 'moment'
import actions from '../actions'
import { SCHEDULE_RANGE_TYPES } from '../consts'

const initState = { 
    from: moment().startOf('isoWeek'),
    to: moment().add({ week: 1 }).startOf('isoWeek'),
    range: SCHEDULE_RANGE_TYPES.week,
}

export default function auth(state = initState, action) {
    switch (action.type) {
        case actions.SCHEDULE_RANGE_CHANGED: {
            const { range } = action.payload
            const startOfKey = range === SCHEDULE_RANGE_TYPES.week ? 'isoWeek' : range
            return {
                ...state,
                range,
                from: moment(state.from).startOf(startOfKey),
                to: moment(state.from ).add({ [range]: 1 }).startOf(startOfKey),
            }
        }
        case actions.SCHEDULE_DATE_CHANGED: {
            const { step } = action.payload
            let from = moment().startOf('isoWeek')
            let to = moment().add({ week: 1 }).startOf('isoWeek')
            if (action.payload.step) {
                from = moment(state.from).add({ [state.range]: step })
                to = moment(state.to).add({ [state.range]: step })
            }
            return {
                ...state,
                from,
                to,
            }
        }
        default:
            return state
    }
}
