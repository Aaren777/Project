import React, { Component, createRef } from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formDate} from '../helpers/utils'


class EditTaskModal extends Component {
    constructor(props) {
        super(props);
        const {date} = props.data
        this.state = {
            ...props.data,
            date: date ? new Date(date) : new Date()
        }
        this.inputRef = createRef()
    }
    componentDidMount(){
        this.inputRef.current.focus()
    }
    handeleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        });
    };
    handeleChangeDate = (value) =>{
        this.setState({
            date: value || new Date()
        })
    }
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
            date: formDate(this.state.date.toISOString())
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
                        ref = {this.inputRef}
                    />
                    <FormControl
                        as="textarea"
                        rows={5}
                        placeholder="Description"
                        name="description"
                        className='mb-3'
                        onChange={this.handeleChange}
                        value={description}
                    />
                    <DatePicker
                            minDate= {new Date()}
                            selected={this.state.date}
                            onChange={this.handeleChangeDate}
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