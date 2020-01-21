import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import { connect } from "react-redux";
import { getGeolocation } from "../actions";
 
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const style = {
	width: '100%',
	height: '100%'
  }
  export class MapContainer extends React.Component {

	state = {
	  showingInfoWindow: false,
	  activeMarker: {},
	  selectedPlace: {},
	};
		
	// 	componentDidMount() {
	// 		this.props.getGeolocation();
	//   }


  
	mapClicked = (mapProps, clickEvent) => {
		console.log(mapProps)
		console.log(clickEvent)
	  }
  
	onMarkerClick = (props, marker, e) =>
	  this.setState({
		selectedPlace: props,
		activeMarker: marker,
		showingInfoWindow: true
	  });
  
	render() {
	 // const {latitude, longitude} = this.props.location
	 console.log(this.props);
	  return (
		<div>
        {!this.props.location ? (<div>Loading...</div>
        ) : (
			<Map google={this.props.google}
			style={style}
			initialCenter={{
				lat: this.props.location.latitude,
				lng: this.props.location.longitude
			}}
			zoom={12}
			onClick={this.onMapClicked}>
			{this.props.restaurants ? 
				(this.props.restaurants.map(rest => {
					return <Marker key={rest.id}
					onClick={this.onMarkerClick}
					name={rest.name}
					position={{lat: rest.latitude, lng: rest.longitude}}
					/>
					})
					) : (null)}


		  <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
			<div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
		  </InfoWindow>
		</Map>
		)
		}
		</div>
		)
	}
}
  
  const mapStateToProps = state => ({
  restaurants: state.restaurants.restaurants,
  location: state.user.location
});
  
export default connect(mapStateToProps, { getGeolocation })(GoogleApiWrapper({
	API_KEY: API_KEY
  })(MapContainer))