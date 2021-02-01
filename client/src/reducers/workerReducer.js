import { GET_WORKERS, DELETE_WORKER, ADD_WORKER, WORKERS_LOADING } from '../actions/types';

const initialState = {
    workers: [],
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_WORKERS:
            return {
                ...state,
                workers: action.payload,
                loading: false
            }
        case DELETE_WORKER:
            return {
                ...state,
                workers: state.workers.filter(worker => worker.id !== action.payload)
            }
        case ADD_WORKER:
            return {
                ...state,
                workers: [{id: action.payload.id, name: action.payload.name}, ...state.workers]
            }
        case WORKERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}