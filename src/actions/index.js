import { RestfulAdapter } from "../adapters";

export function fetchInitialRestaurants(location) {
  return dispatch => {
    dispatch({ type: "RESTAURANTS_LOADING" });
    const body = {
      term: "Food",
      latitude: location.latitude,
      longitude: location.longitude
    };
    RestfulAdapter.createFetch("searches", body).then(data => {
      dispatch({ type: "RESTAURANTS_LOAD", payload: data });
      dispatch({ type: "USER_LOADED" });
    });
  };
}

export function createUser(body) {
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
  return dispatch => {
    dispatch({ type: "USER_LOADING" });
    const newMessage = RestfulAdapter.createFetch("api/v1/login", body);
    dispatch({ type: "USER_LOADED" });
    return newMessage;
  };
}

export function postFavRestaurant(id) {
  return dispatch => {
    dispatch({ type: "FAV_LOADING" });
    const body = { business_id: id };
    RestfulAdapter.createFetch("favorites", body).then(data => {
      dispatch({ type: "FAV_LOAD", payload: data });
    });
  };
}

export function deleteFavRestaurant(id) {
  return dispatch => {
    //dispatch({ type: "FAV_LOADING" });
    RestfulAdapter.deleteFetch("favorites", id).then(data => {
      dispatch({ type: "FAV_LOAD", payload: data });
    });
  };
}

export function searchRest(term, latitude, longitude) {
  return dispatch => {
    dispatch({ type: "RESTAURANTS_LOADING" });
    const body = { term: term, latitude: latitude, longitude: longitude };
    RestfulAdapter.createFetch("searches", body).then(data => {
      dispatch({ type: "RESTAURANTS_LOAD", payload: data });
    });
  };
}

export function chooseRestaurant(restaurant) {
  return { type: "CHOOSE_RESTAURANT", payload: restaurant };
}

export function closeRestaurant() {
  return { type: "CLOSE_RESTAURANT" };
}

export function logIn(user) {
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
