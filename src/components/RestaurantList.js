import React from "react";
import { chooseRestaurant } from "../actions";
import { connect } from "react-redux";
import { Rating, Button } from "semantic-ui-react";


const RestaurantList = props => {
  const { restaurant } = props;
  //console.log('restList props: ', props)
  return (
    <div
      className="ui clearing segment"
      onClick={() => {
        props.chooseRestaurant(restaurant);
      }}
    >
      <h4>
        {restaurant.name}{" "}
        <br></br>
        <Rating defaultRating={restaurant.rating} maxRating={5} />
       <br></br> {restaurant.price}
      </h4>
      <Button basic color="grey">
        <span role="img" aria-label="food">
          🍵 🍽🥗
        </span>
        {restaurant.distance}
      </Button>
    </div>
  );
};

export default connect(null, { chooseRestaurant })(RestaurantList);
