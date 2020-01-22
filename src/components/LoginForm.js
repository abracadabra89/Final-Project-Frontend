import React, { Component } from "react";
import image from "../leftovers-cover.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { afterLogin } from "../actions";


class LoginForm extends Component {
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
    const body = this.state.input

    this.props.postLogin(body)
    .then(user => this.props.handleLogin(user))
    .catch(error => console.log(this.props.history.push("/")))
    this.setState({
      input: {
        email: '',
        password: ''
      }
    })
  }

  render() {
    const { input } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
            Log-in
          </button>
          <Link to="/signup">Register here</Link>
        </form>
      </div>
    );
  }
}
export default connect(null, { afterLogin })(LoginForm);
