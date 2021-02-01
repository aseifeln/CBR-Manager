import axios from 'axios';
import {GET_WORKERS, DELETE_WORKER, ADD_WORKER, WORKERS_LOADING} from './types';

export const getWorkers = () => dispatch => {
    dispatch(setWorkersLoading());
    axios
        .get('/workers')
        .then(res => dispatch({
            type: GET_WORKERS,
            payload: res.data
        }))
};

export const deleteWorker = (id) => dispatch => {
    axios.delete(`/workers/${id}`)
        .then(res => dispatch({
            type: DELETE_WORKER,
            payload: id
        }))
};

export const addWorker = (name) => dispatch => {
    axios
        .post('workers', name)
        .then(res => dispatch({
            type: ADD_WORKER,
            payload: res.data
            })
        )
};

export const setWorkersLoading = () => {
    return {
       type: WORKERS_LOADING
    };
};