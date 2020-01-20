import React from "react";
import { Button } from 'semantic-ui-react'

class ShowRestaurants extends React.Component {
	render(){
		const { id, image_url, name, address, item } = this.props.chosenRestaurant
    return (
		<div className="ui container segment">
        <div className="ui small centered image">
          <img src={image_url} styles={{maxHeight: '10px'}} alt=""></img>
        </div>
        <h1>{name}</h1>
        <h3>{address}</h3>
		<li>{item}</li>
        <div className="ui four column doubling stackable grid container">
		<Button icon="star outline" onClick={() => this.props.addFavorite(id)}/>     
      	  </div>
     	 </div>
    	);
	}
}
export default ShowRestaurants;