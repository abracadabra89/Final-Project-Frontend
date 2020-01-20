import React, { Component } from 'react';
import { connect } from "react-redux";

class Profile extends Component {

	render() {
		return (
		  <div>
			{this.props.currentUser ? (
          <div>
            <h1>Welcome to Your Profile, {this.props.currentUser.email}!</h1>
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
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Profile);
