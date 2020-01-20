import React, { Component } from 'react'
import { connect } from "react-redux";
import { logOut } from "../actions";

class Nav extends Component {
	handleLogout = () => {
	  this.props.logOut();
	  localStorage.clear();
	}
	render(){
		return (
		  <div id="nav">
			{this.props.loggedIn ? (
			  <div className="nav-link" onClick={this.handleLogout}>
				log out
			  </div>
			) : (
			  <div className="nav-link">
				Leftovers
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
	