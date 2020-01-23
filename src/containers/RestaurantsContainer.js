import React from "react";
import AllRestaurants from "./AllRestaurants";
import ShowRestaurants from "../components/ShowRestaurants";
import {
  fetchInitialRestaurants,
  postFavRestaurant,
  getGeolocation
} from "../actions";
import { connect } from "react-redux";
import { Dimmer, Button } from "semantic-ui-react";
import MapContainer from "../components/MapContainer";

class RestaurantsContainer extends React.Component {
  state = {
    active: true
  };

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
  handleSearch = e => {
    this.props.getLocation();
    this.setState({ active: false });
  };

  render() {
    const { active } = this.state;
    console.log(this.props.location);
    return (
      <div className="ui grid">
        <Dimmer active={active} page>
          <Button negative size="big" onClick={this.handleSearch}>
            Find some leftovers!
          </Button>
        </Dimmer>
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
