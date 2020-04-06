import React from "react";
import { Rating, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeRestaurant } from "../actions";

const style = {
  position: "fixed",
  width: "40%"
};

class ShowRestaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    const {
      id,
      image_url,
      name,
      address,
      url,
      rating,
      latitude,
      longitude
    } = this.props.chosenRestaurant;
   // console.log('chosen rest props: ', this.props.chosenRestaurant)
    return (
      <div className="ui container segment center aligned" style={style}>
        <div className="column"></div>
        <Button
          floated="right"
          icon="close"
          onClick={() => this.props.closeRestaurant()}
        />
        <div className="content"></div>
        <a className="header" href={url}>
          <h4>{name}</h4>
        </a>

        <Rating defaultRating={rating} maxRating={5} />
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
              <p>Rating: {rating} </p>
            </a>
          </h4>
        </div>
        <div className="ui four column doubling stackable grid container">
          <Button
            basic
            color="transparent"
            fluid
            onClick={() => this.props.addFav(id)}
          >
            Add to ❤️
          </Button>
          <br></br>
        </div>
      </div>
    );
  }
}
export default connect(null, { closeRestaurant })(ShowRestaurants);
