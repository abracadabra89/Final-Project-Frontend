import React, { Component } from 'react';
import LoginForm from './LoginForm'
import { connect } from "react-redux";
import { logIn, logOut} from "../actions";
import RestaurantsContainer from "../containers/RestaurantsContainer"

class HomePage extends Component {

	componentDidMount(){
	  const token = localStorage.getItem('token')
	  if (token && (token !== undefined && token !== null && token !== "undefined")) {
		const options =   {
		  headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': token
		  }
		}
		fetch(`http://localhost:3000/api/v1/reauth`, options)
		.then(resp => resp.json())
		.then(user => {
		  this.handleLogin(user)
		}
	  )
	  }
  
	}
	handleLogin = (user) => {
		this.props.logIn(user);
		localStorage.setItem('token', user.jwt);
	  }
	
	  render() {
		return (
		  <div id="home">
			{ 
				this.props.loggedIn ? 
				(
			  <div>
				<RestaurantsContainer />
			  </div>
			) :(
			  <div>
			  <LoginForm handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedIn={this.props.loggedIn}/>
			  </div>
			)
		  }
		</div>
		);
	  }
	}
	
	function mapStateToProps(state) {
	  return {
		loggedIn: state.auth.loggedIn
	  }
	}
	
	export default connect(mapStateToProps, { logIn, logOut })(HomePage)