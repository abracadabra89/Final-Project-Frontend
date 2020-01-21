import React, { Component } from 'react';
import { connect } from "react-redux";
import SingleMapContainer from './SingleMapContainer'


class Profile extends Component {
	render() {
		console.log(this.props.currentUser)
		return (
		<div>
		{this.props.currentUser ? (
			<div>
			<h1>Welcome to Your Profile, {this.props.currentUser.email}!</h1>
			<h2>Here are your fav restuarants:</h2>
			<ul>{this.props.currentUser.favorites !== undefined ? (
				this.props.currentUser.favorites.map(restaurant => <li key={restaurant.id}>{restaurant.name}</li> )
				) : (null)}
				</ul>
				<SingleMapContainer />
				</div>
				) : (
					<p>Loading</p>
					)
					}
					</div>
					);
				}
			}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Profile);
