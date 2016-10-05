import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Dashboard from './components/dashboard';
import TodoForm from './components/todoForm';
import TodoList from './components/todoList';

class App extends Component {
  render() {
    return (
      <Router history={ hashHistory }>
          <Route path="/" component={Dashboard}></Route>
          <Route path="/items" component={TodoList}></Route>
          <Route path="/additem" component={TodoForm}></Route>
      </Router>
    );
  }
}

export default App;
