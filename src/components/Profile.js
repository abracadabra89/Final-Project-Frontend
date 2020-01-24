import React, { Component } from "react";
import { connect } from "react-redux";
import SingleMapContainer from "./SingleMapContainer";
import { Button, Icon, Image, Modal, List } from 'semantic-ui-react'
import { deleteFavRestaurant } from "../actions";


class Profile extends Component {

render() {
  //console.log(this.props.currentUser);
  return (
    <div>
      {this.props.currentUser ? (
        <div>
          <div className="ui container">
            <h1>Hello, {this.props.currentUser.email}!</h1>
            <div className="ui segment">
              <h3>Favorites</h3>
              <List divided verticalAlign="middle" size="huge">
                {this.props.currentUser.favorites !== undefined ? (
                  this.props.currentUser.favorites.map(restaurant => (
                    <List.Item key={restaurant.id}>
                        <List.Content>
                          <Modal trigger={<Button>{restaurant.name}</Button>} closeIcon>
                          <Modal.Header>Profile Picture</Modal.Header>
                          <Modal.Content image scrolling>
                            <Image size='small' src={restaurant.image_url} wrapped />
                              <Modal.Description>
                                <h3><a
                                  target="_blank"
                                  href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.location.latitude}%2C${this.props.location.longitude}&destination=${restaurant.latitude}%2C${restaurant.longitude}`}>{restaurant.address}</a></h3><br></br>
                                <br></br>
                              </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                              <Button primary onClick={() => this.props.deleteFavRestaurant(restaurant.favorite_id)}>
                                Delete <Icon name='close' />
                              </Button>
                            </Modal.Actions>
                          </Modal>
                        </List.Content>
                      </List.Item>
                  )
                  )) : (<p>Loading...</p>)
                }
              </List>
              </div>
          </div>
          <SingleMapContainer />
      </div>
    ) : (<p>Loading</p>)
          }
    </div>
  )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  location: state.user.location
});

export default connect(mapStateToProps, deleteFavRestaurant )(Profile);
