import React from "react";
import { Dimmer } from 'semantic-ui-react'
import { delay } from 'lodash'
import { fetchInitialRestaurants, getLocation } from "../actions";
import { connect } from "react-redux";


class RestaurantsContainer extends React.Component {
	state = {
		active: true
	}
		componentDidUpdate(prevProps) {
			if (this.props.location !== prevProps.location) {
				this.props.fetchInitialRestaurants(this.props.location)
				}
			}
		handleSearchClick = (e) => {
			e.target.innerHTML = "Searching..."
			this.props.getLocation()
			delay(this.deactivateDimmer, 3000)
		}
		render() {
			const { active } = this.state
			return (
			<div className="ui grid">
			<Dimmer active={active} onClickOutside={this.handleClose} page>
			</Dimmer>
			</div>
			)
		}
	}
			

			const mapStateToProps = state => ({
				chosenRestaurant: state.restaurants.chosenRestaurant,
				location: state.user.location,
				loading: state.user.loading
		});

export default connect(mapStateToProps, { fetchInitialRestaurants, getLocation  })(RestaurantsContainer)