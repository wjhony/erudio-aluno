import _ from 'lodash'
import { LISTAR_ENTURMACOES } from '../actions'

export default function(state = {}, action) {
    switch (action.type) {
        case LISTAR_ENTURMACOES:
            const newItens = _.mapKeys(action.payload, 'id')
            return { ...state, ...newItens }
        default:
            return state
    }
}
