import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import { connect } from "react-redux";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const style = {
	width: '100%',
	height: '80%'
  }

  export class SingleMapContainer extends React.Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
	  };
	
	  mapClicked = (mapProps, map, clickEvent) => {
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
			// console.log(this.props.restaurants);
			return (
			  <Map google={this.props.google}
				  style={style}
				  initialCenter={{
					lat: 40.7007739,
					lng: -73.9877738
				  }}
				  zoom={11}
				  onClick={this.onMapClicked}>
		
				  {this.props.favorites ? (this.props.favorites.map(rest => {
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
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.user.currentUser.favorites,
});

export default connect(mapStateToProps)(GoogleApiWrapper({
	API_KEY : API_KEY
})(SingleMapContainer))
		