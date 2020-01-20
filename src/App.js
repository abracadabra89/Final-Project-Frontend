import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import Nav from './components/Nav';
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <HomePage />
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/profile" component={Profile}></Route>
        </div>
      </Router>
    );
  }
}
export default App;
