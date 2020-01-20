import React from "react";
import RestaurantList from "../components/RestaurantList";
import { List } from 'semantic-ui-react'
// import { connect } from "react-redux";
// import { fetchInitialRestaurants } from "../actions";

class AllRestaurants extends React.Component {

  render() {
    // console.log(this.props);
    return (
		<div>
		<h2>Restaurants</h2>
        {this.props.restaurants.restaurants.length ? (
			<List animated verticalAlign='middle'>
                    {this.props.restaurants.restaurants.map(rest =>
                        {
                        return (
                                <List.Item key={rest.id}>
                                  <List.Content>
                                    <RestaurantList restaurant={rest} />
                                  </List.Content>
                                </List.Item>
                              );
                        }
                      )}
                  </List>
                ) : (
                  <p>Loading</p>
                  )
                }
          </div>)
        }
  }



export default AllRestaurants;