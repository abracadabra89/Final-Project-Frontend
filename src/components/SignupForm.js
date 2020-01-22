import React, { Component } from "react";
import { logIn } from "../actions";

class SignupForm extends Component {
  state = {
    input: {
		name: "",
		email: "",
		password: ""
    }
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

export default connect(null, { logIn })(SignupForm);

