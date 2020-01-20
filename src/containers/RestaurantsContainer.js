import React from "react";
import AllRestaurants from "./AllRestaurants";
import ShowRestaurants from "../components/ShowRestaurants";
import { fetchInitialRestaurants, postFavoriteRestaurant } from "../actions";
import { connect } from "react-redux";

class RestaurantsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchInitialRestaurants()
  }

  handleClick = (id) => {
    this.props.postFavoriteRestaurant(id)
  }

  render() {
    // console.log(this.props)
    // console.log(this.props.restaurants.chosenRestaurant);
    return (
      <div className="ui grid">
        <div className="six wide column">
          <AllRestaurants restaurants={this.props.restaurants}/>
        </div>
          <div className="ten wide column">
          {this.props.restaurants.chosenRestaurant !== null ? (
            <ShowRestaurants chosenRestaurant={this.props.restaurants.chosenRestaurant} addFavorite={this.handleClick}/>
          ) : (
            <h3>select a restaurant</h3>
          )}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  restaurants: state.restaurants,
  chosenRestaurant: state.chosenRestaurant
  // state.restaurants.find(r => r.id === state.chosenRestaurant)
});

export default connect(mapStateToProps, { fetchInitialRestaurants, postFavoriteRestaurant  })(RestaurantsContainer);