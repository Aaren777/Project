import React, { PureComponent } from "react";
import { Button, Card, } from 'react-bootstrap';
import Styles from './task.module.css';
import PropTypes from 'prop-types';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faEdit, faCheck, faRedo} from '@fortawesome/free-solid-svg-icons';
import {formDate, textTruncate} from '../../helpers/utils'
import {Link} from 'react-router-dom';
import {editTask} from '../../store/actions';
import {connect} from 'react-redux'

class Task extends PureComponent {
    handleChange = () => {
        const { onToggle, data } = this.props
        onToggle(data._id)
    };
    render() {

        const task = this.props.data;
        const { disabled, onDelete, selected, onEdit, editTask } = this.props
        return (
            <Card className={`${Styles.task} ${selected ? Styles.selected : ""}`} >
                <Card.Body>
                    <input
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={selected}
                    />
                    <Link to={`/task/${task._id}`}>
                    <Card.Title>{textTruncate(task.title, 20)}</Card.Title>
                    </Link>
                    <Card.Text>
                       {textTruncate(task.description, 60)}
                    </Card.Text>
                    <Card.Text>
                       Status: {task.status}
                    </Card.Text>
                    <Card.Text>
                       Created ad: {formDate(task.created_at)}
                    </Card.Text>
                    <Card.Text>
                       Date: {formDate(task.date)}
                    </Card.Text>
                    {
                        task.status ==='active'
                         ?
                    <Button
                        className="m-2"
                        variant="success"
                        disabled={disabled}
                        onClick={() => editTask({
                            status:'done',
                            _id:task._id
                        })}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                    :
                    <Button
                        className="m-2"
                        variant="warning"
                        disabled={disabled}
                        onClick={() => editTask({
                            status:'active',
                            _id:task._id
                        })}
                    >
                        <FontAwesomeIcon icon={faRedo} />
                    </Button>
                    }
                    <Button
                        className="m-2"
                        variant="secondary"
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
const mapDispatchToProps = {
    editTask
}
export default connect(null, mapDispatchToProps)(Task)