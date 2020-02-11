import React, { Component } from "react";
import { connect } from "react-redux";
import SingleMapContainer from "./SingleMapContainer";
import { Button, Icon, Image, Modal, List } from "semantic-ui-react";
import { deleteFavRestaurant } from "../actions";

class Profile extends Component {
  

  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        {this.props.currentUser ? (
          <div>
            <div className="ui container">
              <div className="ui segment">
                <h3>Favorites</h3>
                <List divided verticalAlign="middle" size="huge">
                  {this.props.currentUser.favorites !== undefined ? (
                    this.props.currentUser.favorites.map(rest => (
                      <List.Item key={rest.id}>
                        {console.log(rest)}
                        <List.Content>
                          <Modal
                            trigger={<Button>{rest.name}</Button>}
                            closeIcon
                          >
                            <Modal.Content image scrolling>
                              <Image
                                size="small"
                                src={rest.image_url}
                                wrapped
                              />
                              <Modal.Description>
                                {rest.name}
                                <h3>
                                  <a
                                    target="_blank"
                                    href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.location.latitude}%2C${this.props.location.longitude}&destination=${rest.latitude}%2C${rest.longitude}`}
                                  >
                                    {rest.address}
                                  </a>
                                </h3>
                                <br></br>
                                <br></br>
                              </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                              <Button
                                primary
                                onClick={() =>
                                  this.props.deleteFavRestaurant(rest.id)
                                }
                              >
                                Delete <Icon name="close" />
                              </Button>
                            </Modal.Actions>
                          </Modal>
                        </List.Content>
                      </List.Item>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </List>
              </div>
            </div>
            <SingleMapContainer />
          </div>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  location: state.user.location
});

export default connect(mapStateToProps, { deleteFavRestaurant })(Profile);
