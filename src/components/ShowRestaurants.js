import React from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteRestaurant } from "../actions";

const style = {
  position: "fixed",
  width: "40%"
};

class ShowRestaurants extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
  }

  render() {
    const { id, image_url, name, address, items, latitude, longitude } = this.props.chosenRestaurant;
    return (
      <div className="ui container segment center aligned" style={style}>
        <div className="column"></div>
        <Button
          floated="right"
          circular
          icon="close"
          onClick={() => this.props.deleteRestaurant()}
        />
        <div className="ui small centered image">
          <img src={image_url} styles={{ maxHeight: "10px" }} alt=""></img>
        </div>
        <h1>{name}</h1>
        <h3>
          <a
            target="_new"
            href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.location.latitude}%2C${this.props.location.longitude}&destination=${latitude}%2C${longitude}`}
          >
            {address}
          </a>
        </h3>
        <h3>{items}</h3>
        <div className="ui four column doubling stackable grid container">
          <Button fluid onClick={() => this.props.addFav(id)}>
            Add to Favs
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(null, { deleteRestaurant })(ShowRestaurants);
