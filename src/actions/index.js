import { RestfulAdapter } from "../adapters";

export function fetchInitialRestaurants() {
  return dispatch => {
    dispatch({ type: "RESTAURANTS_LOADING" });
    let body = { term: "Items", latitude: 40.7007739, longitude: -73.9877738 };
    RestfulAdapter.createFetch("searches", body).then(data => {
      dispatch({ type: "RESTAURANTS_LOAD", payload: data });
    });
  };
}

export function postFavRestaurant(id) {
  return dispatch => {
    dispatch({ type: "FAV_LOADING" });
    const body = { restaurant_id: id };
    RestfulAdapter.createFetch("favorites", body).then(data => {
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

export function logIn(user) {
  return { type: "LOG_IN", payload: user };
}

export function logOut() {
  return { type: "LOG_OUT" };
}

export function deleteRestaurant() {
  return { type: "DELETE_RESTAURANT" };
}

export const getNewLocation = location => {
  let action = {
    coords: { location }
  };
  return { type: "GET_NEW_LOCATION", payload: action };
};

export const getGeolocation = () => {
  let action = {};
  const defaultLocation = {
    coords: {
      latitude: 40.7007739,
      longitude: -73.9877738
    }
  };
  const geolocation = navigator.geolocation;
  const location = geolocation.getCurrentPosition(position => position);
  if (!location) {
    action = {
      type: "GET_GEOLOCATION",
      payload: defaultLocation
    };
  } else {
    action = {
      type: "GET_GEOLOCATION",
      payload: location
    };
  }
  return dispatch => {
    dispatch(action);
  };
};
