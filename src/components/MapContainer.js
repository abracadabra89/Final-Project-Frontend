import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { connect } from "react-redux";
import { getNewLocation, searchRest } from "../actions";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const style = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends React.Component {
         constructor() {
           super();
           this.state = {
             showingInfoWindow: false,
             activeMarker: {},
             selectedPlace: {}
           };
         }
         shouldComponentUpdate(nextProps, nextState) {
           if (
             this.state.activeMarker === nextState.activeMarker &&
             this.props === nextProps
           ) {
             return false;
           }
           return true;
		 }
		 
         onMouseMarker = (props, marker, e) => {
           this.setState({
             selectedPlace: props,
             activeMarker: marker,
             showingInfoWindow: true
           });
		 };

		 handleMouseClick = (props, marker, e) => {
			 console.log(marker);
			 console.log('state marker', this.state.activeMarker);
			 if (this.state.activeMarker.name !== marker.name) {
				 this.setState({
					 selectedPlace: props,
					 activeMarker: marker,
					 showingInfoWindow: true
          })
	  }
	}

         mapClicked = (mapProps, map, clickEvent) => {
           const thisLatidude = clickEvent.latLng.lat();
           const thisLongitude = clickEvent.latLng.lng();
           const chosenLocation = {
             latitude: thisLatidude,
             longitude: thisLongitude
           };
           this.props.thisLocation(chosenLocation);
           this.props.searchRest("Items", thisLatidude, thisLongitude);
         };

         render() {
           const asset = {
             url:
               "https://icons-for-free.com/iconfiles/png/512/location-131965017472890605.png",
             scaledSize: new this.props.google.maps.Size(25, 40)
           };
           return (
             <div>
               {!this.props.location ? (
                 <div>Loading...</div>
               ) : (
                 <Map
                   google={this.props.google}
                   style={style}
                   initialCenter={{
                     lat: this.props.location.latitude,
                     lng: this.props.location.longitude
                   }}
                   zoom={12}
                   onClick={this.onMapClicked}
                 >
                   {this.props.restaurants
                     ? this.props.restaurants.map(restaurant => {
                         return (
                           <Marker
                             key={restaurant.id}
                             onMouseMarker={this.handleMouseClick}
                             name={restaurant.name}
                             position={{
                               lat: restaurant.latitude,
                               lng: restaurant.longitude
                             }}
                           />
                         );
                       })
                     : null}
                   <Marker
                     id="current"
                     asset={asset}
                     name={"This Location"}
                     position={{
                       lat: this.props.location.latitude,
                       lng: this.props.location.longitude
                     }}
                   />
                   <InfoWindow
                     marker={this.state.activeMarker}
                     visible={this.state.showingInfoWindow}
                   >
                     <div>
                       <h1>{this.state.selectedPlace.name}</h1>
                     </div>
                   </InfoWindow>
                 </Map>
               )}
             </div>
           );
         }
	   }
	

const mapStateToProps = state => ({
  restaurants: state.restaurants.restaurants,
  location: state.user.location
});

export default connect(mapStateToProps, { getNewLocation, searchRest })(
  GoogleApiWrapper({
    API_KEY: API_KEY
  })(MapContainer)
);
