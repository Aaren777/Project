import * as actionTypes from './actionTypes';
import {checkLoginStatus} from '../helpers/auth';

const defaultstate = {
  tasks: [],
  task: null,
  addTaskSuccess: false,
  deleteTaskSuccess: false,
  editTasksSuccess: false,
  editTaskSuccess: false,
  loading: false,
  successMessage: null,
  errorMessage: null,
  sendForSuccess: false,
  isAuthenticated: checkLoginStatus(),
}

export default function reducer(state = defaultstate, action) {
  switch (action.type) {
    case actionsTypes.GET_TASKS: {
      return {
        ...state,
        tasks: action.tasks,
        loading: false,
      }
    }
    case actionsTypes.GET_TASK: {
      return {
        ...state,
        task: action.task,
        loading: false,
      }
    }
    case actionsTypes.PENDING: {
      return {
        ...state,
        addTaskSuccess: false,
        deleteTaskSuccess: false,
        editTaskSuccess: false,
        editTasksSuccess: false,
        editTaskSuccess: false,
        loading: true,
        successMessage: null,
        errorMessage: null,
        sendForSuccess: false,
      }
    }
    case actionsTypes.ERROR: {
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    }
    case actionsTypes.ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        addTaskSuccess: true,
        loading: false,
        successMessage: 'Task created successfully',
      }
    }
    case actionTypes.DELETE_TASK: {
      if (action.from === 'single') {
        return {
          ...state,
          task: null,
          loading: false,
          successMessage: 'Task deleted successfully',
        }
      }
      return {
        ...state,
        tasks: state.tasks.filter((task) => action.taskId !== task._id),
        loading: false,
        successMessage: 'Task deleted successfully',
      }
    }
    case actionsTypes.DELETE_TASKS: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          if (action.taskIds.has(task._id)) {
            return false
          }
          return true
        }),
        deleteTaskSuccess: true,
        loading: false,
        successMessage: 'Tasks deleted successfully',
      }
    }
    case actionTypes.EDIT_TASK: {
      let successMessage = 'Task edited successfully!';
      if (action.status) {
        if (action.status === 'done') {
          successMessage = 'Congrats,you have completed the task!'
        }
        else {
          successMessage = 'The task is active now!'
        }
      }
      if (action.from === 'single') {
        return {
          ...state,
          task: action.editedTask,
          editTaskSuccess: true,
          loading: false,
          successMessage: successMessage,
        }
      }
      const tasks = [...state.tasks];
      const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
      tasks[foundIndex] = action.editedTask;
      return {
        ...state,
        tasks,
        editTasksSuccess: true,
        loading: false,
        successMessage: successMessage,
      }
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true
      }
    }
    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        successMessage: 'Congratulations on your registration!',
      }
    }
    case actionTypes.CONTACT_SUCCESS: {
      return {
        ...state,
        loading: false,
        sendForSuccess: true,
        successMessage: 'Your message has been successfully sent!',
      }
    }
    case actionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
      }
    }
    default: return state
  }
}
