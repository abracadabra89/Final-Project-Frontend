import React from "react";
import { Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { deleteRestaurant } from "../actions";


class ShowRestaurants extends React.Component {
	render(){
		const { id, image_url, name, address, items } = this.props.chosenRestaurant
    return (
		<div className="ui container segment">
        <div className="ui small centered image">
          <img src={image_url} styles={{maxHeight: '10px'}} alt=""></img>
        </div>
        <h1>{name}</h1>
        <h3>{address}</h3>
		<li>{items}</li>
        <div className="ui four column doubling stackable grid container">
		<Button icon="star outline" onClick={() => this.props.addFavorite(id)}/>     
			<Button circular icon="close" onClick={() => this.props.deleteRestaurant()}/>
			</div>
     	 </div>
    	);
	}
}
export default connect(null, { deleteRestaurant }) (ShowRestaurants);