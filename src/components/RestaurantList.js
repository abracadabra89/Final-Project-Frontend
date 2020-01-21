import React from "react";
import { chooseRestaurant } from "../actions";
import { connect } from "react-redux";

const RestaurantList = props => {
  const { restaurant } = props;
  return (
    <div
      onClick={() => {
        props.selectRestaurant(restaurant);
      }}
    >
      <p>{restaurant.name}</p>
    </div>
  );
};

export default connect(null, { chooseRestaurant })(RestaurantList);
