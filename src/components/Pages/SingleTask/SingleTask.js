import React, { Component } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { formDate } from '../../../helpers/utils'
import EditTaskModal from '../../EditTaskModal'

export default class SingleTask extends Component {
    state = {
        task: null,
        openEditModal: false
    };
    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(async (response) => {
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
                    task: res
                });
            })
            .catch((error) => {
                console.log('error', error)
            });
    };
    deleteTask = () =>{
        const taskId = this.state.task._id;
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
            
            this.props.history.push('/')
        })
        .catch((error) => {
            console.log('error',error)
        });
    }
    toggleEditModal =() => {
        this.setState({
        openEditModal: !this.state.openEditModal
        })
    }
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
            this.setState({
                task: res,
                openEditModal: false       
                });
        })
        .catch((error) => {
            console.log('error',error)
        });
    }
    render() {
        const { task, openEditModal } = this.state;
        return (
            <div>
            <Container className='mt-5'>
            <Row>
            <Col xs={12}>
                {
                     task ?
                    <Card className='text-center'>
                        <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>
                                {task.description}
                            </Card.Text>
                            <Card.Text>
                                {formDate(task.date)}
                            </Card.Text>
                            <Button
                                className="m-2"
                                variant="warning"
                            onClick={this.toggleEditModal}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button
                                variant="danger"
                            onClick={this.deleteTask}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Card.Body>
                    </Card>
                    :
                    <h1>Loading</h1>
                }
                </Col>
                </Row>
                </Container>
                {
                    openEditModal && 
                    <EditTaskModal
                    data={task}
                    onClose={this.toggleEditModal}
                    onSave={this.handleSaveTask}
                    />
                }
            </div>
        )
    }
}