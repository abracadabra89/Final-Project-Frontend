import { RestfulAdapter } from "../adapters";

export function fetchInitialRestaurants() {
	
		return dispatch => {
			dispatch({ type: "RESTAURANTS_LOADING" });
			RestfulAdapter.indexFetch("restaurants").then(data => {
			  dispatch({ type: "RESTAURANTS_LOAD", payload: data });
			});
		  };
		}

		export function postFavoriteRestaurant(id){
			return dispatch => {
			  dispatch({ type: "RESTAURANTS_LOADING" });
			  const body = {restaurant_id: id}
			  RestfulAdapter.createFetch("favorites", body).then(data => {
				dispatch({ type: "FAVORITE_LOAD", payload: data})
			  });
			}
		  }


	export function chooseRestaurant(restaurant) {
		return { type: "CHOOSE_RESTAURANT", payload: restaurant };
	}

	export function logIn(user) {
		return { type: "LOG_IN", payload: user };
	}

	export function logOut() {
		return { type: "LOG_OUT" };
	}

	export function deleteRestaurant() {
		return { type: "DELETE_RESTAURANT" }
	  }
	  export const getGeolocation = () => {
		  let action = {}

		const defaultLocation = {
				coords: {
				  latitude: 40.7007739,
				  longitude: -73.9877738
				}
			};
			const geolocation = navigator.geolocation;
			const location = geolocation.getCurrentPosition(position => position)
			if (!location) {
				action = {
					type: 'GET_GEOLOCATION',
					payload: defaultLocation
				}
			} else {
				action = {
				type: "GET_GEOLOCATION",
				payload: location
			}
		}
		return dispatch => {dispatch(action)};
	}
 
		

