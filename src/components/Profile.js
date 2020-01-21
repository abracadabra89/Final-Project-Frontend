import React, { Component } from "react";
import { connect } from "react-redux";
import SingleMapContainer from "./SingleMapContainer";
import { List, Button } from "semantic-ui-react";
import { deleteFavRestaurant } from "../actions";


class Profile extends Component {

render() {
  console.log(this.props.currentUser);
  return (
    <div>
      {this.props.currentUser ? (
        <div>
          <div className="ui container">
            <h1>Hello, {this.props.currentUser.name}!</h1>
            <div className="ui segment">
              <h3>Favorites</h3>
              <List divided verticalAlign="middle" size="huge">
                {this.props.currentUser.favorites !== undefined ? (
                  this.props.currentUser.favorites.map(restaurant => (
                    <List.Item key={restaurant.id}>
                      <List.Content>
                        <List.Header>
                          {restaurant.name}{" "}
                          <Button
                            circular
                            icon="close"
                            onClick={() =>
                              this.props.deleteFavoriteRestaurant(
                                restaurant.favorite_id
                              )
                            }
                          ></Button>
                        </List.Header>
                      </List.Content>
                    </List.Item>
                  ))
                ) : (
                  <p>Loading</p>
                )}
              </List>
            </div>
          </div>
          <SingleMapContainer />
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps, deleteFavRestaurant )(Profile);
