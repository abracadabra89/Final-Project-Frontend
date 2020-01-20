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
			chosenRestaurant: action.payload
		}
		default:
		return state;
	}
}
const userReducer = (state={loggedIn: false, currentUser: null, loading:false}, action) => {
	switch (action.type) {
	  case "LOG_IN":
		return {
		  ...state,
		  loggedIn: false,
		  currentUser: action.payload
		};
	  case "LOG_OUT":
		return {
		  ...state,
		  loggedIn: false,
		  currentUser: null
		};
		case "FAVORITE LOAD":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favorites: [...state.currentUser.favorites, action.payload]
        }
      }
    case "USER_LOADING":
      return {
        ...state,
        loading: true
      }
    case "USER_LOAD":
      return {
        ...state,
        currentUser: action.payload,
        loading: false
      };

	  default:
		return state;
	}
  
  }

const rootReducer = combineReducers({
	user: userReducer,
	restaurants: restaurantsReducer
  });
  
  
export default rootReducer;