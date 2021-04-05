import request from '../helpers/request';
import * as actionsTypes from './actionsTypes';
import {history} from '../helpers/history'

const apiHost = process.env.REACT_APP_API_URL

export function getTasks(params = {}) {
    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
    return (dispatch) => {
        dispatch({ type: actionsTypes.PENDING })
        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                dispatch({ type: actionsTypes.GET_TASKS, tasks: tasks })
            })
            .catch((error) => {
                console.log('error',  error)
                dispatch({type: actionsTypes.ERROR, error: error.message})
            });
    }
}
export function getTask(taskId) {
    return (dispatch) => {
        dispatch({ type: actionsTypes.PENDING })
        request(`${apiHost}/task/${taskId}`)
            .then((task) => {
                dispatch({ type: actionsTypes.GET_TASK, task })
            })
            .catch((error) => {
                console.log('error',  error)
                dispatch({type: actionsTypes.ERROR, error: error.message})
            });
    }
}

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: actionsTypes.PENDING })
        request(`${apiHost}/task`, 'POST', newTask)
            .then((task) => {
                dispatch({ type: actionsTypes.ADD_TASK, task })
            })
            .catch((error) => {
                console.log('error',  error)
                dispatch({type: actionsTypes.ERROR, error: error.message})
            });
    }
}
export function deleteTask(taskId, from) {
    return (dispatch) => {
        dispatch({ type: actionsTypes.PENDING })
        request(`${apiHost}/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({ type: actionsTypes.DELETE_TASK, taskId, from })
                if(from === 'single'){
                    history.push('/')
                }
            })
            .catch((error) => {
                dispatch({type: actionsTypes.ERROR, error: error.message})
            });
    }
}
export function deleteTasks(taskIds) {
    return (dispatch) => {
        dispatch({ type: actionsTypes.PENDING })
        request('http://localhost:3001/task/', 'PATCH', { tasks: [...taskIds] })
            .then(() => {
                dispatch({ type: actionsTypes.DELETE_TASKS, taskIds })
            })
            .catch((error) => {
                dispatch({type: actionsTypes.ERROR, error: error.message})
            });
    }
}
export function editTask(data, from) {
    return (dispatch) => {
        dispatch({ type: actionsTypes.PENDING })
        request(`http://localhost:3001/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                dispatch({ type: actionsTypes.EDIT_TASK, editedTask, from })
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
export function logout(data) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        requestWithoutToken(`${apiHost}/user/sign-out`, 'POST', data)
            .then(() => {
                dispatch({ type: actionTypes.LOGOUT_SUCCESS });
                history.push('/login')
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