import React, { Component } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formDate } from '../../../helpers/utils';
import EditTaskModal from '../../EditTaskModal';
import { connect } from 'react-redux';
import { getTask, deleteTask, editTask } from '../../../store/actions';

class SingleTask extends Component {
    state = {
        openEditModal: false
    };
    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        this.props.getTask(taskId, 'single')
    };
    componentDidUpdate(prevProps) {
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                openEditModal: false
            });
        }
    };
    deleteTask = () => {
        const taskId = this.props.task._id;
        this.props.deleteTask(taskId,'single')
    };
    toggleEditModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    };
    render() {
        const { openEditModal } = this.state;
        const { task, editTask } = this.props;
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
                                            <Card.Text>
                                                Status: {task.status}
                                            </Card.Text>
                                            {
                                                task.status === 'active'
                                                    ?
                                                    <Button
                                                        className="m-2"
                                                        variant="success"
                                                        status='done'
                                                        onClick={this.editStatus}
                                                    >
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </Button>
                                                    :
                                                    <Button
                                                        className="m-2"
                                                        variant="warning"
                                                        status='active'
                                                        onClick={this.editStatus}
                                                      >  
                                                        <FontAwesomeIcon icon={faRedo} />
                                                    </Button>
                                            }
                                            <Button
                                                className="m-2"
                                                variant="warning"
                                                onClick={this.toggleEditModal}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                            <Button
                                            className="m-2"
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
                        from='single'
                    />
                }
            </div>
        )
    }
};
const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTaskSuccess: state.editTaskSuccess
    };
};
const mapDispatchToProps = {
    getTask,
    deleteTask,
    editTask
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)