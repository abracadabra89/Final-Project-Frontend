import { RestfulAdapter } from "../adapters";

// console.log("inside of fetch", location);
  //using thunk, we return are returning a function here instead of
  //a plain object.  Thunk intercepts this returned value, and if it is a
  //function, cancels the normal event of calling our reducers, and
  //instead, passes in 'dispatch' as an argument to the function.
  //the fetch request was extracted out to our adapter, but still functions the same

export function fetchInitialRestaurants(location) {
  //console.log('initial location:', location)
  return dispatch => {
    dispatch({ type: "RESTAURANTS_LOADING" });
    const body = {
      term: "Food",
      latitude: location.latitude,
      longitude: location.longitude
    };
    //console.log('initial restaurant fetch body: ', body)
    RestfulAdapter.createFetch("searches", body).then(data => {
      dispatch({ type: "RESTAURANTS_LOAD", payload: data });
      //console.log('searches data: ', data)
      dispatch({ type: "USER_LOADED" });
    });
  };
}

export function createUser(body) {
  //console.log('create user body arg: ', body)
  return dispatch => {
    dispatch({ type: "USER_LOADING" });
    const newMessage = RestfulAdapter.createFetch("users", body).then(object =>
      alert(object.msg)
    );
    dispatch({ type: "USER_LOADED" });
    return newMessage;
  };
}

export function afterLogin(body) {
  //console.log('afterLogin body arg: ', body)
  return dispatch => {
    dispatch({ type: "USER_LOADING" });
    const newMessage = RestfulAdapter.createFetch("api/v1/login", body);
    dispatch({ type: "USER_LOADED" });
    return newMessage;
  };
}

export function postFavRestaurant(id) { // ACBD // ACDB
  return dispatch => {
    dispatch({ type: "FAV_LOADING" });
    const body = { business_id: id };
    //console.log('fav rest body: ', body)
    RestfulAdapter.createFetch("favorites", body).then(data => {
      dispatch({ type: "FAV_UPDATE", payload: data });
    });
  };
}

export function deleteFavRestaurant(id) {
  //console.log('delete fav id arg: ', id)
  return dispatch => {
    RestfulAdapter.deleteFetch("favorites", id).then(
      dispatch({ type: "FAV_UPDATE", payload: id })
    );
  };
}

export function sortFavRestaurant() {
  console.log('sorting favs')
 return dispatch => {
    dispatch({ type: "FAV_SORT" });
 }
}
  



export function searchRest(term, latitude, longitude) {
//console.log("search rest args-ter,lat,long: ", term, latitude, longitude);
  return dispatch => {
    dispatch({ type: "RESTAURANTS_LOADING" });
    const body = { term: term, latitude: latitude, longitude: longitude };
    RestfulAdapter.createFetch("searches", body).then(data => {
      dispatch({ type: "RESTAURANTS_LOAD", payload: data });
      //console.log("search data: ", data);
    });
  };
}

export function chooseRestaurant(restaurant) {
//console.log('choosen rest: ', restaurant)
  return { type: "CHOOSE_RESTAURANT", payload: restaurant };
}

export function closeRestaurant() {
  return { type: "CLOSE_RESTAURANT" };
}

export function logIn(user) {
  //console.log('login user: ', user)
  return { type: "LOG_IN", payload: user };
}

export function logOut() {
  return { type: "LOG_OUT" };
}

export const getNewLocation = location => {
  let action = {
    coords: { location }
  };
  return { type: "GET_NEW_LOCATION", payload: action };
};

export const getLocation = () => {
  return dispatch => {
    dispatch({ type: "GEOLOCATION_LOADING" });
    const geolocation = navigator.geolocation;
    //console.log('geolocation: ', geolocation)
    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error("error"));
      }
      geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        () => {
          reject(new Error("Permission denied"));
        }
      );
    })
      .then(position => getPosition(position))
      .then(position => {
        if (!position) {
          //console.log("no position");
          dispatch({
            type: "NO_LOCATION"
          });
        } else {
          //console.log(position);
          dispatch({
            type: "GET_GEOLOCATION",
            payload: position
          });
        }
        return position;
      })
      .then(position => {
        //console.log(position);
        fetchInitialRestaurants({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
  };
};
const getPosition = position => {
  return position;
};
