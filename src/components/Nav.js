import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { logOut, searchRest } from "../actions";

class Nav extends Component {
  state = {
    term: ""
  };

  handleLogout = () => {
    this.props.logOut();
    localStorage.clear();
    this.props.history.push("/");
  };

  handleChange = e => {
    this.setState({ term: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const input = document.querySelector("#search");
    this.props.searchRest(
      this.state.term,
      this.props.location.latitude,
      this.props.location.longitude
    );
    input.value = "";
  };

  render() {
    //console.log(this.props)
    return (
      <div>
        {this.props.loggedIn ? (
          <div className="ui menu">
            <NavLink to="/" exact className="link red item" id="site-name">
              Leftovers
            </NavLink>
            <div className="ui menu">
              <NavLink to="/profile" exact className="link item">
                Profile
              </NavLink>
            </div>
            <NavLink to="/" exact className="link item" id="site-name">
              Leftovers Search
            </NavLink>
            <div className="right menu">
              <div className=" fluid item">
                <div className="ui transparent icon input">
                  <input
                    id="search"
                    type="search"
                    placeholder="Search Restaurants"
                    onChange={this.handleChange}
                    name="term"
                  ></input>
                  <i
                    className="search link icon"
                    onClick={this.handleSubmit}
                  ></i>
                </div>
              </div>
              <a className="item" onClick={this.handleLogout}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div className="ui menu">
            <NavLink
              to="/"
              exact
              className="link active red item"
              id="site-name"
            >
              Leftovers
            </NavLink>
            <div className="ui top attached tabulat menu">
              <NavLink to="/" exact className="link item" id="site-name">
                Log In
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    location: state.user.location
  };
}
export default withRouter(
  connect(mapStateToProps, { logOut, searchRest })(Nav)
);
