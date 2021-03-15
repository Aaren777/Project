import * as actionsTypes from './actionsTypes';

const defaultstate = {
  tasks: [],
  task: null,
  addTaskSuccess: false,
  deleteTaskSuccess: false,
  editTasksSuccess: false,
  editTaskSuccess: false,
  loading: false,
  successMessage: null,
  errorMessage: null
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
        editTasksSuccess: false,
        loading: true,
        successMessage: null,
        errorMessage: null
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
    case actionsTypes.DELETE_TASK: {
      if(action.from === 'single'){
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
    case actionsTypes.EDIT_TASK: {
      if(action.from === 'single'){
        return {
          ...state,
          task: action.editedTask,
          editTaskSuccess: true,
          loading: false,
          successMessage: 'Task edited successfully',
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
        successMessage: 'Task edited successfully',
      }
    }
    default: return state
  }
}
