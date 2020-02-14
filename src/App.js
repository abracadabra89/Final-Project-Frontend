import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Profile from "./components/Favorites";
import SignupForm from "./components/SignupForm";
import Nav from "./components/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/favorites" component={Profile}></Route>
          <Route exact path="/signup" component={SignupForm}></Route>
        </div>
      </Router>
    );
  }
}
export default App;
