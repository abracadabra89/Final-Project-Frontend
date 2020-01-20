import React from "react";
import RestaurantList from "../components/RestaurantList";
// import { connect } from "react-redux";
// import { fetchInitialRestaurants } from "../actions";

class AllRestaurants extends React.Component {
  // componentDidMount() {
  //   this.props.fetchInitialRestaurants()
  // }

  render() {
    // console.log(this.props);
    return (
		<div>
		<h2>Restaurants</h2>
        {this.props.restaurants.restaurants.length ? (
          <div className="column">
            {this.props.restaurants.restaurants.map(rest => <RestaurantList key={rest.id} restaurant={rest} />)}
          </div>
        ) : (
          <p>Loading</p>
          )
        }
      </div>
    )
  }

}

export default AllRestaurants;