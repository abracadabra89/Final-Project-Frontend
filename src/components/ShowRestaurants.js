import React from "react";

const ShowRestaurants = (props) => {
    const { name } = props.selectedRestaurant
    return (
      <div>
        <h1>{name}</h1>
      </div>
    );
}
export default ShowRestaurants;
