import React from "react";
import { chooseRestaurant } from "../actions";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

const RestaurantList = props => {
  const { restaurant } = props;
  return (
    <div
      className="ui clearing segment"
      onClick={() => {
        props.chooseRestaurant(restaurant);
      }}
    >
      <p>{restaurant.name}</p>
      <Button basic color="grey">
        <span role="img" aria-label="food">
          🍵 🍽🥗
        </span>
      </Button>
    </div>
  );
};

export default connect(null, { chooseRestaurant })(RestaurantList);
