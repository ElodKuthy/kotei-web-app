import actions from '../actions'

function mapTrainingName(trainingTypes) {
    return (training) => ({
        ...training, 
        name: (trainingTypes.find(trainingType => trainingType.id === training.type) || { name: '' }).name,
    })
}

function mapCoachName(coaches) {
    return (training) => {
        const { name, alias } = coaches.find(coach => coach.id === training.coach) || { name: '', alias: '' }
        return {
            ...training, 
            coach: {
                id: training.coach,
                name,
                alias,
            }
        }
    }
}

export default function auth(state = { gyms: [], locations: [], trainingTypes: [], coaches: [], trainings: [] }, action) {

    switch (action.type) {
        case actions.GYMS_LOADED:
            return {
                ...state,
                gyms: action.payload || [],
            }
        case actions.LOCATIONS_LOADED:
            return {
                ...state,
                locations: action.payload || [],
            }
        case actions.TRAINING_TYPES_LOADED: {
            const trainingTypes = action.payload || [] 
            const trainings = state.trainings.map(mapTrainingName(trainingTypes))
            return {
                ...state,
                trainingTypes,
                trainings,
            }
        }
        case actions.COACHES_LOADED: {
            const coaches = action.payload || []
            const trainings = state.trainings.map(mapCoachName(coaches))
            return {
                ...state,
                coaches,
                trainings,
            }
        }
        case actions.TRAININGS_LOADED: {
            const trainings = (action.payload || []).map(mapTrainingName(state.trainingTypes)).map(mapCoachName(state.coaches))
            return {
                ...state,
                trainings,
            }
        }
        default:
            return state
    }
}
