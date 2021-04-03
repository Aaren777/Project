import request from '../helpers/request';
import * as actionTypes from './actionTypes';
import { history } from '../helpers/history';
import { saveToken, requestWithoutToken } from '../helpers/auth';

const apiHost = process.env.REACT_APP_API_HOST

export function getTasks(params = {}) {
    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                if(!tasks) return;
                dispatch({ type: actionTypes.GET_TASKS, tasks: tasks })
            })
            .catch((error) => {
                console.log('error', error)
                dispatch({ type: actionTypes.ERROR, error: error.message })
            });
    }
}
export function getTask(taskId) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task/${taskId}`)
            .then((task) => {
                if(!task) return;
                dispatch({ type: actionTypes.GET_TASK, task })
            })
            .catch((error) => {
                console.log('error', error)
                dispatch({ type: actionTypes.ERROR, error: error.message })
            });
    }
}

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task`, 'POST', newTask)
            .then((task) => {
                if(!task) return;
                dispatch({ type: actionTypes.ADD_TASK, task })
            })
            .catch((error) => {
                console.log('error', error)
                dispatch({ type: actionTypes.ERROR, error: error.message })
            });
    }
}
export function deleteTask(taskId, from) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task/${taskId}`, 'DELETE')
            .then((res) => {
                if(!res) return;
                dispatch({ type: actionTypes.DELETE_TASK, taskId, from })
                if (from === 'single') {
                    history.push('/')
                }
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            });
    }
}
export function deleteTasks(taskIds) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task/`, 'PATCH', { tasks: [...taskIds] })
            .then((res) => {
                if(!res) return;
                dispatch({ type: actionTypes.DELETE_TASKS, taskIds })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            });
    }
}
export function editTask(data, from) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                if(!editedTask) return;
                dispatch({ type: actionTypes.EDIT_TASK, editedTask, from, status: data.status })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            });
    }
}
export function register(data) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        requestWithoutToken(`${apiHost}/user`, 'POST', data)
            .then((result) => {
                dispatch({ type: actionTypes.REGISTER_SUCCESS })
                history.push('/login')
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            });
    }
}
export function login(data) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        requestWithoutToken(`${apiHost}/user/sign-in`, 'POST', data)
            .then((result) => {
                saveToken(result);
                dispatch({ type: actionTypes.LOGIN_SUCCESS });
                history.push('/')
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            });
    }
}
export function contact(data) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        requestWithoutToken(`${apiHost}/form`, 'POST', data)
            .then((result) => {
                dispatch({ type: actionTypes.CONTACT_SUCCESS })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            });
    }
}