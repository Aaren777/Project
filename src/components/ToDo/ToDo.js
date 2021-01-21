import React, { Component } from 'react';
// import Styles from './toDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm'


class ToDo extends Component {
    state = {
        tasks: [],
        selectedTask: new Set(),
        showConfirm: false,
        openNewTaskModal: false
    };

    addTask = (newTask) => {
        const tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks,
            openNewTaskModal: false
        });
    };
    deleteTask = (taskId) => {
        const newTask = this.state.tasks.filter((task) => taskId !== task._id);
        this.setState({
            tasks: newTask
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
        })
    }
    render() {
        const { tasks, selectedTask, showConfirm, openNewTaskModal} = this.state;
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
            </Container>
        )
    }
}
export default ToDo