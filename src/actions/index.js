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

		const defaultLocation = {
				coords: {
				  latitude: 40.7007739,
				  longitude: -73.9877738
				}
			};
	
		const geolocation = navigator.geolocation;
	
		const location = new Promise((resolve, reject) => {
			if (!geolocation) {
				reject(new Error('Not Supported'));
			}
	
		geolocation.getCurrentPosition((position) => {
			resolve(position);
		}, () => {
			reject (new Error('Permission denied'));
		});
	  });
	
	  if (!location) {
		return dispatch => dispatch({type: "GET_GEOLOCATION",
		payload: defaultLocation})
	  } else {
		  return dispatch => dispatch({
			type: "GET_GEOLOCATION",
			payload: location
		  })
		}
	  }
		

