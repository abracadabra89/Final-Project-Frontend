import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { afterLogin } from "../actions";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

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
      .catch(error => this.props.history.push("/"));
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
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="grey" textAlign="center"></Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <div className="input">
                <Form.Input
                  fluid
                  type="text"
                  icon="user"
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail"
                  value={input.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input">
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={this.handleChange}
                />
              </div>

              <Button type="submit" color="grey" fluid size="large">
                <h4>Login</h4>
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to="/signup">
              <h4>Register here</h4>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(null, { afterLogin })(LoginForm);
