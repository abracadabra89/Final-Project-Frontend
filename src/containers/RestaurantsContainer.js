import React from "react";
import AllRestaurants from "./AllRestaurants";
import ShowRestaurants from "../components/ShowRestaurants";
import {
  fetchInitialRestaurants,
  postFavRestaurant,
  getGeolocation
} from "../actions";
import { connect } from "react-redux";
import MapContainer from "../components/MapContainer";

class RestaurantsContainer extends React.Component {
  componentDidMount() {
    this.props.getGeolocation();
    //this.props.fetchInitialRestaurants(this.props.location);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchInitialRestaurants(this.props.location);
    }
  }

  handleFavClick = id => {
    this.props.postFavRestaurant(id);
  };

  render() {
    console.log(this.props.location);
    // console.log(this.props.restaurants.chosenRestaurant);
    return (
      <div className="ui grid">
        <div className="six wide column">
          {this.props.restaurants !== null ? (
            <AllRestaurants restaurants={this.props.restaurants} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="ten wide column">
          <MapContainer />
          {this.props.chosenRestaurant !== null ? (
            <ShowRestaurants
              location={this.props.location}
              chosenRestaurant={this.props.chosenRestaurant}
              addFav={this.handleFavoriteClick}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants.restaurants,
  chosenRestaurant: state.restaurants.chosenRestaurant,
  location: state.user.location,
  loading: state.user.loading
  // state.restaurants.find(r => r.id === state.chosenRestaurant)
});

export default connect(mapStateToProps, {
  fetchInitialRestaurants,
  postFavRestaurant,
  getGeolocation
})(RestaurantsContainer);
