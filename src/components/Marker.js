import React from "react";
import { Marker } from "google-maps-react";

export class Marker extends React.Component {
  render() {
    return <Marker onClick={this.onMarkerClick} name={"Current location"} />;
  }
}

export default Marker;
