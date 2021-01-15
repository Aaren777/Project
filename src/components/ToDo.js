import React, { Component } from 'react';
import Styles from './toDo.module.css';
import { Container, Row, Col, Button, Card, InputGroup, Form, FormControl } from 'react-bootstrap'
import idGenerator from '../helpers/idGenerator';

class ToDo extends Component {
    state = {
        inputValue: '',
        tasks: []
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
        }
        const newTask = {
            _id: idGenerator(),
            title: inputValue
        }
        const tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: tasks,
            inputValue: ''
        })
    }
    deleteTask = (taskId) => {
        const newTask = this.state.tasks.filter((task) => taskId !== task._id)
        this.setState({
            tasks: newTask
        })
    }
    render() {
        const { tasks, inputValue } = this.state;
        const taskComponents = tasks.map((task) => {
            return (
                <Col key={task._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}>
                    <Card className={Styles.task} >
                        <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="" />
                            </Form.Group>
                        </Form>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                        </Card.Text>
                            <Button
                                variant="danger"
                                onClick={() => this.deleteTask(task._id)}
                            >
                                Delete</Button>
                        </Card.Body>
                    </Card>
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
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="primary"
                                        onClick={this.addTask}
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
                </Container>
            </div>
        )
    }
}
export default ToDo