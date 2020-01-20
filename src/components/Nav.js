import React, { Component } from 'react'
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'
import { logOut } from "../actions";

class Nav extends Component {
	handleLogout = () => {
	  this.props.logOut();
	  localStorage.clear();
	}
	render(){
		return (
		  <div>
			{this.props.loggedIn ? (
			  <div className="ui menu">
				<NavLink
				  to="/"
				  exact
				  className="link red item"
				  id="site-name"
				>Leftovers</NavLink>
				<NavLink
				  to="/profile"
				  exact
				  className="link item"
				>Profile</NavLink>
				<NavLink
				  to="/"
				  exact
				  className="link item"
				>Foodr Search</NavLink>
				<div className="right menu">
				  <div className=" fluid item">
					<div className="ui transparent icon input">
					  <input id="search" type="search" placeholder="Search Restaurants..." onChange={this.handleChange} name="term"></input>
					  <i className="search link icon" onClick={this.handleSubmit}></i>
					</div>
				  </div>
				  <a className="item" onClick={this.handleLogout}>
					Log Out
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
				>Leftovers</NavLink>
				<div className="right menu">
				  <NavLink
					to="/"
					exact
					className="link item"
				  >Log In</NavLink>
				</div>
			  </div>
			)}
		  </div>
		)
	  }
	}
	function mapStateToProps(state) {
		return {
		  loggedIn: state.auth.loggedIn
		}
	  }
export default connect(mapStateToProps, { logOut })(Nav);
	