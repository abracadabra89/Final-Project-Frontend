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
    //console.log("nav props: ", this.props)
    return (
      <div>
        {this.props.loggedIn ? (
          <div className="ui secondary menu">
            <NavLink to="/" className="link item" id="navmenu">
              Home
            </NavLink>
            <div className="ui secondary menu">
              <NavLink to="/favorites" className="link item" id="navmenu">
                Favorites
              </NavLink>
              <div className="logo"></div>
            </div>
            <div className="right menu">
              <div className="ui fluid category search">
                <div className="ui icon input">
                  <input
                    className="prompt"
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
              <a className="item" id="navmenu" onClick={this.handleLogout}>
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="logo"
              style={{
                display: "flex",
                justifyContent: "center",
                height: "110px",
                width: "210px",
                padding: "70px",
                alignItems: "stretch"
              }}
            ></div>
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
