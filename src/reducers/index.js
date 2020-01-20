import { combineReducers } from 'redux';

const restaurantsReducer = (state = { restaurants: [], chosenRestaurant: null, loading: false, formData: {name: "", title: "", key_skill: ""} }, action) => {
	switch (action.type) {
	  case "RESTAURANTS_LOAD":
		// console.log(action);
		return {
		  ...state,
		  loading: true
		}

	  case "CHOOSE_RESTAURANT":
		// console.log(action.payload);
		return {
		  ...state,
		  chosenRestaurant: action.payload
		}
		
	  default:
		return state;
	}
}
 	const userReducer = (state={loggedIn: false, currentUser: null, loading: false, location: {}}, action) => {
		switch (action.type) {
			case "GET_LOCATION": {
				return {
					...state,
					location: {
						latitude: action.payload.coords.latitude,
						longitude: action.payload.coords.longitude,
					}
				}
			}
		}
	}

const rootReducer = combineReducers({
	user: userReducer,
	restaurants: restaurantsReducer
  });
  
  
export default rootReducer;