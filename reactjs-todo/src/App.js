import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import axios from 'axios';
import Dashboard from './components/dashboard';
import TodoForm from './components/todoForm';
import TodoList from './components/todoList';

class App extends Component {
  constructor(){
      super();
      this.state = {
          data: []
      };
      this.updateListState = this.updateListState.bind(this);
  }
  componentWillMount(){
    this.fetchList();
  }
  render() {
    return (
      <Router history={ hashHistory }>
          <Route path="/" component={Dashboard} data={this.state.data}></Route>
          <Route path="/items(/:filter)" component={TodoList} data={this.state.data} updateListState={this.updateListState}></Route>
          <Route path="/additem" component={TodoForm} data={this.state.data} updateListState={this.updateListState}></Route>
      </Router>
    );
  }
	fetchList(){
		axios.get('http://localhost:5000/items')
		.then(res => {
			res.data.forEach(item => item.key = item._id);
			this.updateListState(res.data);
		})
		.catch(err => console.error(err));
	}
	updateListState(data){
		this.setState({
			data: data
		});
	}  
}

export default App;
