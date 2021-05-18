import turnsService from '../services/turns';

export const getTurns = () => {
    return async dispatch => {
        const turns = await turnsService.getAll()
        dispatch({
            type: 'GETALL',
            data: turns
        })
    }
}

export const createTurn = (turn) => {
    return async dispatch => {
        const turnToCreate = await turnsService.createTurn(turn)
        dispatch({
            type: 'CREATE',
            content: turnToCreate
        })
    }
}

export const deleteTurn = (id) => {
    return async dispatch => {
        await turnsService.deleteTurn(id)
        dispatch({
            type: 'DELETE',
            data: { id }
        })
    }
}

const turnsReducer = (state = [], action) => {
    switch(action.type){
        case 'CREATE':
            return [...state, action.content]
        case 'GETALL':
            return action.data
        case 'DELETE':
            const { id } = action.data;
            return state.filter((turn) => turn.id !== id)
        default:
            return state
    }
}

export default turnsReducer;