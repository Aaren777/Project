import React, { PureComponent } from "react";
import { Button, Card, } from 'react-bootstrap';
import Styles from './task.module.css';
import PropTypes from 'prop-types';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
class Task extends PureComponent {
    handleChange = () => {
        const { onToggle, data } = this.props
        onToggle(data._id)
    };
    render() {

        const task = this.props.data;
        const { disabled, onDelete, selected, onEdit } = this.props
        return (
            <Card className={`${Styles.task} ${selected ? Styles.selected : ""}`} >
                <Card.Body>
                    <input
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={selected}
                    />
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                       {task.description}
                    </Card.Text>
                    <Button
                        className="m-2"
                        variant="warning"
                        disabled={disabled}
                        onClick={() => onEdit(task)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger"
                        disabled={disabled}
                        onClick={() => onDelete(task._id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
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
    selected: PropTypes.bool.isRequired,
};
export default Task