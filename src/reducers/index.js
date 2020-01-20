import { combineReducers } from 'redux';

const restaurantsReducer = (state = { restaurants: [], chosenRestaurant: null, loading: false, formData: {name: "", title: "", key_skill: ""} }, action) => {
	switch (action.type) {
		case "RESTAURANTS_LOADING":
			return {
				...state,
				loading: true
			}
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
			restaurants: action.payload,
			//chosenRestaurant: action.payload
		}
		default:
		return state;
	}
}
const authReducer = (state={loggedIn: false, currentUser: null}, action) => {
	switch (action.type) {
	  case "LOG_IN":
		return {
		  ...state,
		  loggedIn: true,
		  currentUser: action.payload
		};
	  case "LOG_OUT":
		return {
		  ...state,
		  loggedIn: false,
		  currentUser: null
		};
	  default:
		return state;
	}
  
  }

const rootReducer = combineReducers({
	auth: authReducer,
	restaurants: restaurantsReducer
  });
  
  
export default rootReducer;