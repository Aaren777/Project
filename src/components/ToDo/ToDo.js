import React, { Component } from 'react';
import Styles from './toDo.module.css';
import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'
import idGenerator from '../../helpers/idGenerator';
import Task from '../Task/task'

class ToDo extends Component {
    state = {
        inputValue: '',
        tasks: [],
        selectedTask: new Set()
    };

    handeleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };
    addTask = () => {
        const inputValue = this.state.inputValue.trim();
        if (!inputValue) {
            return;
        };
        const newTask = {
            _id: idGenerator(),
            title: inputValue
        };
        const tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: tasks,
            inputValue: ''
        });
    };
    deleteTask = (taskId) => {
        const newTask = this.state.tasks.filter((task) => taskId !== task._id)
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
            selectedTask: new Set()
        });
    }
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.addTask()
        }
    }
    render() {
        const { tasks, inputValue, selectedTask } = this.state;
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
                   />
                </Col>
            )
        })
        return (
            <div>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <h2 className="text-center">Todo List</h2>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Hello World"
                                    value={inputValue}
                                    onChange={this.handeleChange}
                                    onKeyDown={this.handleKeyDown}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="primary"
                                        onClick={this.addTask}
                                        disabled={!!selectedTask.size}
                                    >
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                        </Col>
                    </Row>
                    <Row>
                        {taskComponents}
                    </Row>
                    <Row className="justify-content-center">
                        <Button
                            variant="danger"
                            onClick={this.removeSelected}
                            disabled={!selectedTask.size}

                        >
                            Delete Selected
                        </Button>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default ToDo