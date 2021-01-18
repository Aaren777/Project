import React, { Component } from "react";
import { Button, InputGroup, FormControl } from 'react-bootstrap';
// import Styles from './NewTaskask.module.css';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';

class NewTask extends Component {
    state = {
        title: '',
        description: ''

    };
    handeleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.addTask()
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
        this.setState ({
            title: '',
            description: ''
        })
    }

    render() {
        const { title, description } = this.state
        const { disabled } = this.props
        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Title"
                    value={title}
                    onChange={this.handeleChange}
                    onKeyDown={this.handleKeyDown}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button
                        variant="primary"
                        onClick={this.handleSumbit}
                        disabled={disabled}
                    >
                        Add
                </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
};
NewTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired
}
export default NewTask