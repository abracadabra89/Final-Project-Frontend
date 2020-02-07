import React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { connect } from "react-redux";
import {
  getNewLocation,
  getLocation,
  searchRest,
  chooseRestaurant
} from "../actions";

const style = {
  width: "100%",
  height: "92.5%"
};

export class MapContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      infoWindow: false,
      activeMarker: {},
      chosenPlace: {}
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
      chosenPlace: props,
      activeMarker: marker,
      infoWindow: true
    });
  };

  handleMouseClick = (props, marker, e) => {
    //console.log(marker);
    //console.log("state marker", this.state.activeMarker);
    if (this.state.activeMarker.name !== marker.name) {
      this.setState({
        chosenPlace: props,
        activeMarker: marker,
        infoWindow: true
      });
    }
  };

  handleMouseRemove = e => {
    this.setState({
      chosenPlace: {},
      activeMarker: {},
      infoWindow: false
    });
  };

  openedInfoWindow = () => {
    const title = document.getElementById("title");
    title.addEventListener("click", e => {
      const selected = this.props.restaurants.filter(
        restaurant => restaurant.name === e.target.innerHTML
      );
      this.props.chooseRestaurant(selected[0]);
      this.setState({ infoWindow: false });
    });
  };

  mapClicked = (mapProps, map, clickEvent) => {
    const thisLatidude = clickEvent.latLng.lat();
    const thisLongitude = clickEvent.latLng.lng();
    const chosenLocation = {
      latitude: thisLatidude,
      longitude: thisLongitude
    };
    this.props.getNewLocation(chosenLocation);
    this.setState({ infoWindow: false });
    this.props.searchRest("Italian", thisLatidude, thisLongitude);
  };

  render() {
    const asset = {
      url:
        "https://icons-for-free.com/iconfiles/png/512/location-131965017472890605.png",
      scaledSize: new this.props.google.maps.Size(25, 40)
    };
    return (
      <div>
        {this.props.location.latitude === undefined ? (
          <div className="ui segment">
            <div className="ui active inverted dimmer">
              <div className="ui mini text loader">Loading</div>
            </div>
            <br></br>
            <br></br>
            <br></br>
          </div>
        ) : (
          <Map
            google={this.props.google}
            style={style}
            center={{
              lat: this.props.location.latitude,
              lng: this.props.location.longitude
            }}
            zoom={12}
            onClick={this.mapClicked}
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
              onOpen={this.openedInfoWindow}
              marker={this.state.activeMarker}
              visible={this.state.infoWindow}
            >
              <div>
                <h1 id="title">{this.state.chosenPlace.name}</h1>
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
  location: state.user.location,
  loading: state.user.loading
});

export default connect(mapStateToProps, {
  getNewLocation,
  getLocation,
  searchRest,
  chooseRestaurant
})(
  GoogleApiWrapper({
    KEY:
      "rHjt4KZNVRamu4cGM_nbGIHwLz08nG57OZREk97edmfNyiTh9cGHfoxHpd88DiRnnTLeFh4YJD2C-CTvnQOFFrA77IaQyQTJofaRGNjc93DIhZuzaKN24g8BpZwwXnYx"
  })(MapContainer)
);
