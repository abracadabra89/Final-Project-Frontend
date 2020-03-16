import React, { Component } from "react";
import { logIn, createUser } from "../actions";
import { connect } from "react-redux";

class SignupForm extends Component {
  state = {
    input: {
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
    //console.log('signup form input state: ', this.state)
    return (
      <div className="ui segment center landing masthead">
        <div className="ui text container">
          <h1 className="ui inverted header">Sign Up</h1>
        </div>
        <form onSubmit={this.handleSubmit} className="ui large form">
          <div className="ui stacked segment">
            <div
              className="field
			"
            >
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail address"
                  value={input.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div
              className="field
			"
            >
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button type="submit" className="ui fluid inverted blue button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { logIn, createUser })(SignupForm);
