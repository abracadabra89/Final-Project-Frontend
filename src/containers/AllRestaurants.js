import React from "react";
import RestaurantList from "../components/RestaurantList";
import { List } from "semantic-ui-react";

class AllRestaurants extends React.Component {
  render() {
    return (
      <div>
        {this.props.restaurants !== undefined ? (
          <List animated verticalAlign="middle">
            {this.props.restaurants.map(rest => {
              return (
                <List.Item key={rest.id}>
                  <List.Content>
                    <RestaurantList restaurant={rest} />
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}

export default AllRestaurants;
