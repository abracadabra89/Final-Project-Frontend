import React, { Component } from "react";
import { logIn, createUser } from "../actions";
import { connect } from "react-redux";

class SignupForm extends Component {
  state = {
    input: {
      name: "",
      email: "",
      password: ""
    }
  };

  handleChange = e => {
    const newInput = { ...this.state.input, [e.target.name]: e.target.value };
    this.setState({ input: newInput });
  };

  handleSubmit = e => {
    e.preventDefault();
    const body = this.state.input;

    this.props.createUser(body).then(this.props.history.push("/"));
  };

  render() {
    const { input } = this.state;
    return (
      <div id="home">
        <h1>Sign Up!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="ui field">
            <label>Name: </label>
            <input
              name="name"
              value={input.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <label>Email: </label>
            <input
              name="email"
              value={input.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <label>Password: </label>
            <input
              name="password"
              type="password"
              value={input.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="ui basic green button">
            SignUp
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { logIn, createUser })(SignupForm);
