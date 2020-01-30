import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { connect } from "react-redux";

const KEY = process.env.REACT_APP_GOOGLE_API_KEY;


const style = {
  width: "100%",
  height: "80%"
};

export class SingleMapContainer extends React.Component {
  state = {
    chosenPlace: {},
    activeMarker: {},
    infoWindow: false
  };

  mapClicked = (mapProps, map, clickEvent) => {
    console.log(mapProps);
    console.log(clickEvent);
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      chosenPlace: props,
      activeMarker: marker,
      infoWindow: true
    });

  render() {
    // console.log(this.props.restaurants);
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 40.7007739,
          lng: -73.9877738
        }}
        zoom={10}
        onClick={this.mapClicked}
      >
        {this.props.favorites
          ? this.props.favorites.map(restaurant => {
              return (
                <Marker
                  key={restaurant.id}
                  onClick={this.onMarkerClick}
                  name={restaurant.name}
                  position={{
                    lat: restaurant.latitude,
                    lng: restaurant.longitude
                  }}
                />
              );
            })
          : null}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.infoWindow}
        >
          <div>
            <h1>{this.state.chosenPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.user.currentUser.favorites
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    KEY: KEY
  })(SingleMapContainer)
);
