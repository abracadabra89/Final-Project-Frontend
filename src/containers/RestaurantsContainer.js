import React from "react";
import AllRestaurants from "./AllRestaurants";
import ShowRestaurants from "../components/ShowRestaurants";
import {
  fetchInitialRestaurants,
  postFavRestaurant,
  getLocation
} from "../actions";
import { connect } from "react-redux";
import { Dimmer, Button } from "semantic-ui-react";
import MapContainer from "../components/MapContainer";
import { delay } from "lodash";

class RestaurantsContainer extends React.Component {
  state = {
    active: true
  };

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
    delay(this.deactivateDimmer, 3000);
  };

  deactivateDimmer = () => {
    this.setState({ active: false });
  };

  handleNear = () => {
    this.setState({ active: false });
  };

  render() {
    const { active } = this.state;
    //console.log(this.props.location);
    return (
      <div className="ui grid">
        <Dimmer active={active} onClickOutside={this.handdleNear} page>
          <Button basic color="teal" onClick={this.handleSearch}>
            Find restaurants
          </Button>
        </Dimmer>
        <div className="six wide column">
          <br></br>
          <br></br>
          <br></br>
          {this.props.restaurants !== null ? (
            <AllRestaurants restaurants={this.props.restaurants} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="ten wide column">
          <br></br>
          <br></br>
          <br></br>
          <MapContainer />
          {this.props.chosenRestaurant !== null ? (
            <ShowRestaurants
              location={this.props.location}
              chosenRestaurant={this.props.chosenRestaurant}
              addFav={this.handleFavClick}
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
});

export default connect(mapStateToProps, {
  fetchInitialRestaurants,
  postFavRestaurant,
  getLocation
})(RestaurantsContainer);
