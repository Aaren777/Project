import React, { Component, createRef } from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
// import Styles from './NewTaskask.module.css';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formDate} from '../../helpers/utils';
import { connect } from 'react-redux';
import { addTask} from '../../store/action'

class NewTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date(),
        };
        this.inputref = createRef()
    }
    componentDidMount(){
        this.inputref.current.focus()
    }
    handeleChange = (event) => {
        const {name , value } = event.target
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
        const newTask = {
            title,
            description,
            date: formDate(this.state.date.toISOString())
        };
        this.props.addTask(newTask)
    }

    render() {
        const { onClose } = this.props
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
                            ref = {this.inputref}
                        />
                        <FormControl
                            as="textarea"
                            rows={5}
                            placeholder="Description"
                            name="description"
                            onChange={this.handeleChange}
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
                            Add</Button>
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
NewTask.propTypes = {
    onClose: PropTypes.func.isRequired
}
const mapDispatchToProps = {
    addTask
}
export default connect(null, mapDispatchToProps)(NewTask)