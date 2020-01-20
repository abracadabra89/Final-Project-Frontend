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

