import React, { Component } from "react";
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
    const body = this.state.input;

    this.props
      .afterLogin(body)
      .then(user => this.props.handleLogin(user))
      .catch(error => console.log(this.props.history.push("/")));
    this.setState({
      input: {
        email: "",
        password: ""
      }
    });
  };

  render() {
    const { input } = this.state;
    return (
      <div className="ui segment center landing masthead">
        <div className="ui text container">
          <h1 className="ui inverted header">Leftovers</h1>
          <h2 className="ui inverted header">Save wasted food!</h2>
        </div>
        <form onSubmit={this.handleSubmit} className="ui large form">
          <div className="ui stacked segment">
            <div className="input">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={input.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="input">
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
            <button type="submit" className="ui fluid inverted green button">
              Login
            </button>
          </div>
          <Link to="/signup">Register here</Link>
        </form>
      </div>
    );
  }
}

export default connect(null, { afterLogin })(LoginForm);
