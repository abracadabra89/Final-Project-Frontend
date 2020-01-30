import React from "react";
import { chooseRestaurant } from "../actions";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";


const RestaurantList = props => {
  const { restaurant } = props;
  return (
    <div
      onClick={() => {
        props.chooseRestaurant(restaurant);
      }}
    >
      <p>{restaurant.name}</p>
      <Button size="tiny" floated="right">
        {restaurant.distance}
      </Button>
    </div>
  );
};

export default connect(null, { chooseRestaurant })(RestaurantList);
