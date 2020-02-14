import { combineReducers } from "redux";

const restaurantsReducer = (
  state = {
    restaurants: [],
    chosenRestaurant: null,
    loading: true
  },
  action
) => {
  switch (action.type) {
    case "RESTAURANTS_LOADING":
      return {
        ...state,
        loading: true
      };
    case "RESTAURANTS_LOAD":
      return {
        ...state,
        restaurants: action.payload,
        loading: false
      };
    case "CHOOSE_RESTAURANT":
      return {
        ...state,
        chosenRestaurant: action.payload
      };
    case "CLOSE_RESTAURANT":
      return {
        ...state,
        chosenRestaurant: null
      };
    default:
      return state;
  }
};
const userReducer = (
  state = { loggedIn: false, currentUser: null, loading: false, location: {}, favorites: {}},
  action
) => {
  switch (action.type) {
    case "LOG_IN":
      //console.log(action.payload);
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

    case "USER_LOADING":
      return {
        ...state,
        loading: true
      };
    case "USER_LOAD":
      return {
        ...state,
        currentUser: action.payload,
        loading: false
      };

    case "USER_LOADED":
      return {
        ...state,
        loading: false
      };
    case "GEOLOCATION_LOADING":
      return {
        ...state,
        loading: true
      };

    case "GET_GEOLOCATION": {
      return {
        ...state,
        location: {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.longitude
        }
      };
    }
    case "GET_NEW_LOCATION": {
      // console.log(action.payload);
      return {
        ...state,
        location: {
          latitude: action.payload.coords.location.latitude,
          longitude: action.payload.coords.location.longitude
        }
      };
    }

    case "NO_LOCATION":
      return  {
        ...state,
        loading: false
      }

    case "FAV_LOADING":
      return {
        ...state,
        loading: true
      };
    case "FAV_LOAD":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
        },
        loading: false
      };

      case 'FAV_DELETE':
      return {
        ...state,
        favorites: {
          ...state.currentUser.favorites,
          favorites: state.currentUser.favorites.filter(
            favorite => favorite.id !== action.payload
          )
        },
        loading: false
      };
      default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  restaurants: restaurantsReducer
});

export default rootReducer;
