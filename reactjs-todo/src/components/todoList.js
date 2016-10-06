import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import TodoItem from './todoItem';

class TodoList extends React.Component{
    constructor(){
        super();
        this.removeFromList = this.removeFromList.bind(this);
        this.updateForComplete = this.updateForComplete.bind(this);
    }
	render() {
		if(this.props.route.data.length === 0){
			return <div><Link to="/">back</Link><br/>List is empty</div>
		}
		let list = (this.getData(this.props.route.data)).map(item => {
			return (
				<TodoItem key={item.key} nodeId={item._id} task={item.task} complete={item.complete} removeItem={this.removeFromList} updateComplete={this.updateForComplete} />
			);
		},this);
		return (
			<div>
				<ul className="list-group">
					{list}
				</ul>
                <nav>
                    <Link to="/">Home</Link><br/>
                    <Link to="/items/completed">Completed list</Link><br/>
                    <Link to="/items/active">Active list</Link><br/>
                </nav>
			</div>
		);
	}
	getData(items){
		if(this.props.params.filter === this.props.categories[0]){
			return items.filter(item => {return item.complete });
		} else if(this.props.params.filter === this.props.categories[1]){
			return items.filter(item => {return !item.complete });
		} else{
			return items;
		}
	}
	updateForComplete(nodeId, complete) {
		axios.put('http://localhost:5000/items/'+nodeId, {
			complete: complete
		})
		.then(res => {
			let items = this.props.route.data;
			let itemIndex = items.findIndex(item => item._id === res.data._id);
			let item = res.data;
			item.key = item._id;
			items[itemIndex] = item;
			this.props.route.updateListState(items);
			this.context.router.push('/');
		})
		.catch(err => console.error(err));
	}
	removeFromList(nodeId){
		axios.delete('http://localhost:5000/items/'+nodeId, {
		})
		.then(res => {
			let items = this.props.route.data;
			items = items.filter(item => {return item._id !== nodeId});
			this.props.route.updateListState(items);
			this.context.router.push('/');
		})
		.catch(err => console.error(err));
	}
}

TodoList.defaultProps = {
	categories: ['completed','active']
}

TodoList.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default TodoList
