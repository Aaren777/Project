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
        showConfirm: false
    };

    addTask = (newTask) => {
        const tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: tasks,
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
        })
    }
    render() {
        const { tasks, selectedTask, showConfirm } = this.state;
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
                   onToggle = {this.toggleTask} 
                   disabled = {!!selectedTask.size}
                   onDelete = {this.deleteTask}
                   />
                </Col>
            )
        })
        return (
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <h2 className="text-center">Todo List</h2>
                            <NewTask
                            disabled={!!selectedTask.size}
                            onAdd = {this.addTask}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {taskComponents}
                    </Row>
                    <Row className="justify-content-center">
                        <Button
                            variant="danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTask.size}
                        >
                            Delete Selected
                        </Button>
                    </Row>
                    {showConfirm && 
                        <Confirm
                        onClose = {this.toggleConfirm}
                        onConfirm = {this.removeSelected}
                        count = {selectedTask.size}
                        /> }
                </Container>
        )
    }
}
export default ToDo