import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { afterLogin } from "../actions";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
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
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="white" textAlign="center"></Header>
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

              <Button type="submit" color="white" fluid size="large">
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
      // <div className="ui segment center landing masthead">
      //   <div className="ui text container">
      //     <h1 className="ui inverted header">Bouffer</h1>
      //   </div>
      //   <form onSubmit={this.handleSubmit} className="ui large form">
      //     <div className="ui stacked segment">
      //       <div className="ui transparent input">
      //         <div className="ui left icon input">
      //           <i className="user icon"></i>
      //           <input
      //             type="text"
      //             name="email"
      //             placeholder="Email"
      //             value={input.email}
      //             onChange={this.handleChange}
      //           />
      //         </div>
      //       </div>
      //       <div className="ui transparent inputinput">
      //         <div className="ui left icon input">
      //           <i className="lock icon"></i>
      //           <input
      //             type="password"
      //             name="password"
      //             placeholder="Password"
      //             value={input.password}
      //             onChange={this.handleChange}
      //           />
      //         </div>
      //       </div>
      //       <button type="submit" className="ui fluid inverted blue button">
      //         Login
      //       </button>
      //     </div>
      //     <Link to="/signup">Register here</Link>
      //   </form>
      // </div>
    );
  }
}


export default connect(null, { afterLogin })(LoginForm);
