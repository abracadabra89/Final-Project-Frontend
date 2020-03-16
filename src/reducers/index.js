import { combineReducers } from "redux";

const restaurantsReducer = (
  state = {
    restaurants: [],
    chosenRestaurant: null,
    loading: false
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
  state = {
    loggedIn: false,
    currentUser: null,
    favorites: [],
    loading: false,
    location: {},
    sorting: "asc"
  },
  action
) => {
  switch (action.type) {
    case "LOG_IN":
      // console.log('log in payload: ', action.payload);
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
      console.log("user load payload: ", action.payload);
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
      return {
        ...state,
        location: {
          latitude: null,
          longitude: null
        }
      };
    case "FAV_SORT":
      //console.log(state.currentUser.favorites)
      return {
        ...state,
         sorting: state.sorting === DESC ? ASC : DESC, 
        currentUser: {
          ...state.currentUser,
          favorites: sortFavs(state.currentUser.favorites, state.sorting)   
  }
    }

    case "FAV_LOADING":
      return {
        ...state,
        loading: true
      };
    case "FAV_UPDATE":
      //console.log('fav update payload: ', action.payload)
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          favorites: state.currentUser.favorites.map(favorite => {
            if (favorite.id === action.payload) {
              return action.payload;
            } else {
              return favorite;
            }
          })
        }
      };
    default:
      return state;
  }
};

const ASC = "asc";
const DESC = "desc";

function sortFavs(favs, direction){
  console.log(direction)
  return favs.sort(function(a, b) {
  if (a.name > b.name) return direction === ASC ? 1 : -1
  if (b.name > a.name) return direction === ASC ? -1 : 1 
  return 0;
}
 )}



// combine the reducers into a single state tree

const rootReducer = combineReducers({
  user: userReducer,
  restaurants: restaurantsReducer
});

export default rootReducer;
