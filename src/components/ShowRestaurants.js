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
    const { id, image_url, name, address, latitude, longitude } = this.props.chosenRestaurant;
    return (
      <div className="ui container segment center aligned" style={style}>
        <div className="column"></div>
        <Button
          transparent
          floated="right"
          icon="close"
          onClick={() => this.props.deleteRestaurant()}
        />
        <div className="content"></div>
        <a class="header">
          <h4>{name}</h4>
        </a>
        <div className="ui fluid card">
          <div className="ui small centered image">
            <img src={image_url} styles={{ maxHeight: "12px" }} alt=""></img>
          </div>
          <h4>
            <a
              target="_new"
              href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.location.latitude}%2C${this.props.location.longitude}&destination=${latitude}%2C${longitude}`}
            >
              {address}
              <br></br>
            </a>
          </h4>
        </div>
        <div className="ui four column doubling stackable grid container">
          <Button
            content="Standard"
            basic
            fluid
            onClick={() => this.props.addFav(id)}
          >
            Add to ❤️
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(null, { deleteRestaurant })(ShowRestaurants);
