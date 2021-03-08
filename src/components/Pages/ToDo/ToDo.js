import React, { Component } from 'react';
// import Styles from './toDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../../Task/task';
import NewTask from '../../NewTask/NewTask';
import Confirm from '../../Confirm';
import EditTaskModal from '../../EditTaskModal';
import Search from '../../Search/Search'
import { connect } from 'react-redux';
import { getTasks, deleteTask, deleteTasks } from '../../../store/action';

class ToDo extends Component {
    state = {
        selectedTask: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null
    };
    componentDidMount() {
        this.props.getTasks()
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false
            })
        }
        if (!prevProps.deleteTaskSuccess && this.props.deleteTaskSuccess) {
            this.setState({
                selectedTask: new Set(),
                showConfirm: false
            });
        }
        if (!prevProps.editTasksSuccess && this.props.editTasksSuccess) {
            this.setState({
                editTask: null
            });
        }
    }

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
        const { selectedTask } = this.state;
        this.props.deleteTasks(selectedTask)
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
    render() {
        const { tasks } = this.props;
        const { selectedTask, showConfirm, openNewTaskModal, editTask } = this.state;
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
                        onDelete={this.props.deleteTask}
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
                    <Col xs={10}>
                        <Search/>
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
const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTaskSuccess: state.deleteTaskSuccess,
        editTasksSuccess: state.editTasksSuccess
    };
};
const mapDispatchToProps = {
    getTasks,
    deleteTask,
    deleteTasks
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDo)