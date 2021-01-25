import React, { Component } from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
// import Styles from './NewTaskask.module.css';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';


class NewTask extends Component {
    state = {
        title: '',
        description: ''

    };
    handeleChange = (event) => {
        const {name , value } = event.target
        this.setState({
            [name]: value
        });
    };
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleSumbit()
        }
    }
    handleSumbit = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();
        if (!title) {
            return;
        };
        const newTask = {
            _id: idGenerator(),
            title,
            description
        };
        this.props.onAdd(newTask)
    }

    render() {
        const { onClose } = this.props
        return (
            <>
                <Modal
                    show={true}
                    onHide={onClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add New Task
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder="Title"
                            onChange={this.handeleChange}
                            onKeyPress={this.handleKeyDown}
                            className='mb-3'
                            name="title"
                        />
                        <FormControl
                            as="textarea"
                            rows={5}
                            placeholder="Description"
                            name="description"
                            onChange={this.handeleChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={this.handleSumbit}
                            variant='success'
                        >
                            Add</Button>
                        <Button
                            onClick={onClose}
                            variant='danger'
                        >
                            Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
};
NewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}
export default NewTask