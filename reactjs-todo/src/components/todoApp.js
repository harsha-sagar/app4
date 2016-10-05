import React from 'react';
import axios from 'axios';
import TodoForm from './todoForm';
import TodoList from './todoList';

class TodoApp extends React.Component{
    constructor(){
        super();
        this.state = {
            data: []
        };
        this.removeFromList = this.removeFromList.bind(this);
        this.addIntoList = this.addIntoList.bind(this);
        this.updateForComplete = this.updateForComplete.bind(this);
    }
    componentWillMount(){
		this.fetchList();
    }
	render() {
		return (
			<div>
				<h1>Todo List</h1>
				<TodoList data={this.state.data} removeItem={this.removeFromList} updateComplete={this.updateForComplete} />
				<TodoForm onTaskAdd={this.addIntoList} />
			</div>
		);
	}

	fetchList(){
		axios.get('http://localhost:5000/items')
		.then(res => {
			res.data.forEach(item => item.key = item._id);
			this.setState({
				data: res.data
			});
		})
		.catch(err => console.error(err));
	}
	addIntoList(task) {
		axios.post('http://localhost:5000/items', {
			task: task
		})
		.then(res => {
			this.fetchList();
		})
		.catch(err => console.error(err));
	}
	updateForComplete(nodeId, complete) {
		axios.put('http://localhost:5000/items/'+nodeId, {
			complete: complete
		})
		.then(res => {
			this.fetchList();
		})
		.catch(err => console.error(err));
	}
	removeFromList(nodeId){
		axios.delete('http://localhost:5000/items/'+nodeId, {
		})
		.then(res => {
			this.fetchList();
		})
		.catch(err => console.error(err));
	}
}

export default TodoApp
