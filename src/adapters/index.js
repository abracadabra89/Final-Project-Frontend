const url = `http://localhost:3000`;

function headers() {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token
    };
  } else {
    return {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
  }
}

export class RestfulAdapter {
  static indexFetch(route) {
    return fetch(`${url}/${route}`, getRequest()).then(handleResponse);
  }
  static showFetch(route, id) {
    return fetch(`${url}/${route}/${id}`, getRequest()).then(handleResponse);
  }
  static createFetch(route, body) {
    return fetch(`${url}/${route}`, postRequest(body)).then(handleResponse);
  }
  static editFetch(route, id, body) {
    return fetch(`${url}/${route}/${id}`, patchRequest(body)).then(
      handleResponse
    );
  }

  static deleteFetch(route, id) {
    console.log("delete fav id: ", id);
    return fetch(`${url}/${route}/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          return res;
        } else {
          return Promise.reject("An error occurred.");
        }
      })
      .then(res => console.log(res));
  }
}

function getRequest() {
  return {
    headers: headers()
  };
}

function patchRequest(body) {
  return {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(body)
  };
}

function postRequest(body) {
  return {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body)
  };
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw alert("Something went wrong");
}
