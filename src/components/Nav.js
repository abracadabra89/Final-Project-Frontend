import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter, NavLink } from 'react-router-dom'
import { logOut, searchRest } from "../actions";


class Nav extends Component {

	state = {
		term: ""
	  }

	handleLogout = () => {
	  this.props.logOut();
	  localStorage.clear();
	  this.props.history.push("/")
	}

	handleChange = (e) => {
		this.setState({ term: e.target.value})
	  }
	
	  handleSubmit = (e) => {
		e.preventDefault()
		this.props.searchRest(this.state.term)
	  }

	render(){
		//console.log(this.props)
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
              className="active item"
              id="site-name"
            >Leftovers Search</NavLink>
				<div className="right menu">
				  <div className=" fluid item">
					<div className="ui transparent icon input">
					<input type="text" placeholder="Search " onChange={this.handleChange} name="term"></input>
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
		  loggedIn: state.user.loggedIn
		}
	  }
	  export default withRouter(connect(mapStateToProps, { logOut, searchRest })(Nav));
	