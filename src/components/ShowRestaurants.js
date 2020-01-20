import React from "react";

const ShowRestaurants = (props) => {
    const { name } = props.chosenRestaurant
    const { image_url, address, item } = props.chosenRestaurant
    return (
      <div>
        <div className="ui small centered image">
          <img src={image_url} styles={{maxHeight: '10px'}} alt=""></img>
        </div>
        <h1>{name}</h1>
        <h3>{address}</h3>
		<li>{item}</li>
        <div className="ui four column doubling stackable grid container">
          
        </div>

      </div>
    );
}
export default ShowRestaurants;