import React, { Component } from "react";
import { Button, Card, } from 'react-bootstrap';
import Styles from './task.module.css';
import PropTypes from 'prop-types';
class Task extends Component {
state = {
    selected: false
};
handleChange = () => {
    const {onToggle, data} = this.props
    onToggle(data._id)
    this.setState({
        selected: !this.state.selected
    });
};
    render() {
        
        const task = this.props.data;
        const{disabled, onDelete} = this.props
        const{selected} = this.state
        return (
            <Card className={`${Styles.task} ${selected ? Styles.selected : ""}`} >
                <Card.Body>
                    <input
                        type="checkbox"
                        onChange={this.handleChange}
                    />
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button
                        variant="danger"
                        disabled={disabled}
                        onClick={() => onDelete(task._id)}
                    >
                        Delete</Button>
                </Card.Body>
            </Card>
        )
    }
}
Task.propTypes = {
    data: PropTypes.object,
    onToggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default Task