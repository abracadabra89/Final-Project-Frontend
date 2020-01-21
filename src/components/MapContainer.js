import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import { connect } from "react-redux";
import { getNewLocation, searchRest } from "../actions";
 
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


  
	mapClicked = (mapProps, map, clickEvent) => {
		const thisLatidude = clickEvent.latLng.lat();
		const thisLongitude = clickEvent.latLng.lng();
		const chosenLocation = {
			latitude: thisLatidude,
			longitude: thisLongitude
		}
		this.props.thisLocation(chosenLocation)
		this.props.searchRest('Items', thisLatidude, thisLongitude)
	  }
  
	onMarkerClick = (props, marker, e) =>
	  this.setState({
		selectedPlace: props,
		activeMarker: marker,
		showingInfoWindow: true
	  });
  
	render() {
	 const asset = {url:'data:image/png;base64,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',
	 scaledSize: new this.props.google.maps.Size(25, 40)}
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
					<Marker
					asset={asset}
					name={'This Location'}
					position={{lat: this.props.location.latitude, lng: this.props.location.longitude}}		
					/>
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
  
export default connect(mapStateToProps, { getNewLocation, searchRest })(GoogleApiWrapper({
	API_KEY: API_KEY
})(MapContainer))