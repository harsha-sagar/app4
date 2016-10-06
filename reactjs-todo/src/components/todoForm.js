import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class TodoForm extends React.Component{
    constructor(){
        super();
        this.doSubmit = this.doSubmit.bind(this);
        this.addIntoList = this.addIntoList.bind(this);
    }
	render() {
		return (
			<form className="form-horizontal" onSubmit={this.doSubmit}>
				<div className="form-group">
					<div className="col-md-10">
						<input type="text" ref={(c) => this._input = c} className="form-control" placeholder="Add into list here..." />
					</div>
					<div className="col-md-2">
						<input type="submit" value="Add" className="btn btn-primary" />
					</div>
				</div>
			</form>
		);
	}
	doSubmit(e) {
		e.preventDefault();
		var task = ReactDOM.findDOMNode(this._input).value.trim();
		if (!task) {
			return;
		}
		this.addIntoList(task);
		ReactDOM.findDOMNode(this._input).value = '';
		return;
	}
	addIntoList(task) {
		axios.post('http://localhost:5000/items', {
			task: task
		})
		.then(res => {
			let items = this.props.route.data;
			let item = res.data;
			item.key = item._id;
			items.push(item);
			this.props.route.updateListState(items);
			this.context.router.push('/');
		})
		.catch(err => console.error(err));
	}
}

TodoForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default TodoForm
