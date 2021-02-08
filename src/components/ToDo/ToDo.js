import React, { Component } from 'react';
// import Styles from './toDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal'


class ToDo extends Component {
    state = {
        tasks: [],
        selectedTask: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null
    };
    componentDidMount(){
        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async(response) => {
            const res = await response.json();
            if (response.status >= 400 && response.status < 600) {
                if (res.error) {
                    throw res.error;
                }
                else {
                    throw new Error('Error')
                }
            }
            this.setState({
                tasks: res
            });
        })
        .catch((error) => {
            console.log('error',error)
        });
    }

    addTask = (newTask) => {
        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async(response) => {
            const res = await response.json();
            if (response.status >= 400 && response.status < 600) {
                if (res.error) {
                    throw res.error;
                }
                else {
                    throw new Error('Error')
                }
            }

            const tasks = [...this.state.tasks, res];
            this.setState({
                tasks,
                openNewTaskModal: false
            });
        })
        .catch((error) => {
            console.log('error',error)
        });
    };
    deleteTask = (taskId) => {
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async(response) => {
            const res = await response.json();
            if (response.status >= 400 && response.status < 600) {
                if (res.error) {
                    throw res.error;
                }
                else {
                    throw new Error('Error')
                }
            }
            const newTasks = this.state.tasks.filter((task) => taskId !== task._id);
            this.setState({
                tasks: newTasks
            });
        })
        .catch((error) => {
            console.log('error',error)
        });
    };
    toggleTask = (taskId) => {
        const selectedTask = new Set(this.state.selectedTask);
        if (selectedTask.has(taskId)) {
            selectedTask.delete(taskId)
        }
        else { selectedTask.add(taskId) }
        this.setState({
            selectedTask
        });
    };
    removeSelected = () => {
        const { selectedTask, tasks } = this.state;
        const body = {
            tasks: [...selectedTask]
        }
        fetch('http://localhost:3001/task/', {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async(response) => {
            const res = await response.json();
            if (response.status >= 400 && response.status < 600) {
                if (res.error) {
                    throw res.error;
                }
                else {
                    throw new Error('Error')
                }
            }
            const newTask = tasks.filter((task) => {
                if (selectedTask.has(task._id)) {
                    return false
                }
                return true
            });
            this.setState({
                tasks: newTask,
                selectedTask: new Set(),
                showConfirm: false
            });
        })
        .catch((error) => {
            console.log('error',error)
        });
        const newTask = tasks.filter((task) => {
            if (selectedTask.has(task._id)) {
                return false
            }
            return true
        });
        this.setState({
            tasks: newTask,
            selectedTask: new Set(),
            showConfirm: false
        });
    }
    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };
    selectAll = () => {
        const taskIds = this.state.tasks.map((task) => task._id)
        this.setState({
            selectedTask: new Set(taskIds)
        });
    };
    deselectAll = () => {
        this.setState({
            selectedTask: new Set()
        });
    };
    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    };
    handleEdit = (editTask) => {
        this.setState({ editTask })
    };
    handleSaveTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async(response) => {
            const res = await response.json();
            if (response.status >= 400 && response.status < 600) {
                if (res.error) {
                    throw res.error;
                }
                else {
                    throw new Error('Error')
                }
            }
            const tasks = [...this.state.tasks];
            const foundIndex = tasks.findIndex((task) => task._id === editedTask._id);
            tasks[foundIndex] = editedTask;
            this.setState({
                tasks,
                editTask: null        
                });
        })
        .catch((error) => {
            console.log('error',error)
        });
    };
    render() {
        const { tasks, selectedTask, showConfirm, openNewTaskModal, editTask } = this.state;
        const taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}>
                    <Task
                        data={task}
                        onToggle={this.toggleTask}
                        disabled={!!selectedTask.size}
                        onDelete={this.deleteTask}
                        selected={selectedTask.has(task._id)}
                        onEdit={this.handleEdit}
                    />
                </Col>
            )
        })
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={10}>
                        <h2 className="text-center">Todo List</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <Button
                            variant="primary"
                            onClick={this.toggleNewTaskModal}
                        >
                            Add New Task
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <Button
                            variant="warning"
                            onClick={this.selectAll}
                        >
                            Select All
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <Button
                            variant="warning"
                            onClick={this.deselectAll}
                        >
                            Deselect All
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <Button
                            variant="danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTask.size}
                        >
                            Delete Selected
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {taskComponents}
                </Row>
                { showConfirm &&
                    <Confirm
                        onClose={this.toggleConfirm}
                        onConfirm={this.removeSelected}
                        count={selectedTask.size}
                    />
                }
                {openNewTaskModal &&
                    <NewTask
                        onClose={this.toggleNewTaskModal}
                        onAdd={this.addTask}
                    />
                }
                {editTask &&
                    <EditTaskModal
                        data={editTask}
                        onClose={() => this.handleEdit(null)}
                        onSave={this.handleSaveTask}
                    />}
            </Container>
        )
    }
}
export default ToDo