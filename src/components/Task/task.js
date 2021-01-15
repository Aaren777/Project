import React, { Component } from "react";
import { Button, Card, } from 'react-bootstrap';
import Styles from './task.module.css';

class Task extends Component {

    render() {
        
        const task = this.props.data;
        
        return (
            <Card className={Styles.task} >
                <Card.Body>
                    <input
                        type="checkbox"
                        onChange={() => this.props.onToggle(task._id)}
                    />
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button
                        variant="danger"
                        // disabled={!!selectedTask.size}
                        onClick={() => this.deleteTask(task._id)}
                    >
                        Delete</Button>
                </Card.Body>
            </Card>
        )
    }
}
export default Task