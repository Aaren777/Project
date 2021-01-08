import React, { Component } from "react";

class ToDo extends Component {
    state = {
        inputValue: '',
        tasks: []
    };

    handeleChange = (event)=>{
        this.setState({
            inputValue:event.target.value
        });
    };
    addTask = ()=>{
        const inputValue = this.state.inputValue.trim();
        if(!inputValue){
            return;
        }
        const tasks = [...this.state.tasks, inputValue];
        this.setState({
            tasks: tasks,
            inputValue: ''
        })
    }
    render() {
        const {tasks, inputValue} = this.state;
        const taskComponents = tasks.map((task, index)=>{
            return <li key = {index}>{task}</li>
        })
        return (
            <div>
                <h2>Todo List</h2>
                <input 
                type = "text"
                value = {inputValue}
                onChange = {this.handeleChange}
                />
                <button
                onClick = {this.addTask}>Add task</button>
                <ol>
                    { taskComponents}
                </ol>
            </div>
        )
    }
}
export default ToDo