import React, { Component } from 'react';
import ListItem from './ListItem.js';
import InputBar from './InputBar.js'

class CreateList extends Component{

    constructor(props){
        super(props);
        this.state = {
            todoList:[],
            toggleClick:(taskIndex) => {
                console.log(taskIndex);
                const newToDoList = [...this.state.todoList];
                newToDoList[taskIndex].completed = !newToDoList[taskIndex].completed;
                this.setState({
                    todoList: newToDoList
                });
            },
            clearTasks:()=>{
                const uncompletedTasks = this.state.todoList.filter(function(todo) {
                    return todo.completed == false;
                });
                this.setState({
                    todoList: uncompletedTasks
                });
                console.log("we need to clear tasks... :( ");
            },
            addNewTask:(taskText)=>{
               console.log(`${taskText} needs to be added to our list still...`);
               if (taskText == ''){ return; } 
               let newItem = {task: taskText, completed: false};
               let currentList = [...this.state.todoList];
               currentList.push(newItem);
               this.setState({
                    todoList: currentList
               })
            }
        };    
    };
    render(){
        return(
			<div className="panel panel-default">
				<div className="panel-heading">
					<h5>Create a new list</h5>
				</div>
				<div className="panel-body">
				<InputBar addTask={this.state.addNewTask} clearTasks={this.state.clearTasks}/>
		            <div>
		                {this.state.todoList.map((item,index)=>{
		                    return <ListItem task={item.task} completed={item.completed} handleClick={this.state.toggleClick} key={index} taskIndex={index}/>
		                })}
		            </div>
		        </div>
		    </div>
        )
    }
};

export default CreateList;
