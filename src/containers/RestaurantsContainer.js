import React from "react";
import AllRestaurants from "./AllRestaurants";
import ShowRestaurants from "../components/ShowRestaurants";
import { fetchInitialRestaurants } from "../actions";
import { connect } from "react-redux";

class RestaurantsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchInitialRestaurants()
  }

  render() {
    // console.log(this.props)
    // console.log(this.props.restaurants.selectedRestaurant);
    return (
      <div className="ui grid">
        <div className="six wide column">
          <AllRestaurants restaurants={this.props.restaurants}/>
        </div>
          <div className="ten wide column">
          {this.props.restaurants.selectedRestaurant !== null ? (
            <ShowRestaurants selectedRestaurant={this.props.restaurants.selectedRestaurant} />
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
  // state.restaurants.find(r => r.id === state.selectedRestaurant)
});

export default connect(mapStateToProps, { fetchInitialRestaurants })(RestaurantsContainer);