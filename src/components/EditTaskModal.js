import React, { Component } from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';


class EditTaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.data
        }
    };
    handeleChange = (event) => {
        const { name, value } = event.target
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
        this.props.onSave({
            _id: this.state._id,
            title,
            description,
        })
    }

    render() {
        const { onClose } = this.props
        const { title, description } = this.state
        return (
            <Modal
                show={true}
                onHide={onClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Title"
                        onChange={this.handeleChange}
                        onKeyPress={this.handleKeyDown}
                        className='mb-3'
                        name="title"
                        value={title}
                    />
                    <FormControl
                        as="textarea"
                        rows={5}
                        placeholder="Description"
                        name="description"
                        onChange={this.handeleChange}
                        value={description}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.handleSumbit}
                        variant='success'
                    >
                        Save</Button>
                    <Button
                        onClick={onClose}
                        variant='danger'
                    >
                        Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
};
EditTaskModal.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
}

export default EditTaskModal