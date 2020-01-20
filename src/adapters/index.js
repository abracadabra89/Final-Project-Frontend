const baseUrl = `http://localhost:3000`;

function headers() {
  return {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
}
export class RestfulAdapter {
	static indexFetch(route) {
	  return fetch(`${baseUrl}/${route}`, getRequest()).then(responseHandler);
	}
	static showFetch(route, id) {
	  return fetch(`${baseUrl}/${route}/${id}`, getRequest()).then(
		responseHandler
	  );
	}
	static createFetch(route, body) {
	  return fetch(`${baseUrl}/${route}`, postRequest(body)).then(
		responseHandler
	  );
	}
	static editFetch(route, id, body) {
		return fetch(`${baseUrl}/${route}/${id}`, patchRequest(body)).then(
		  responseHandler
		);
	  }
	  static deleteFetch(route, id) {
		return fetch(`${baseUrl}/${route}/${id}`, {
		  method: "DELETE",
		  headers: headers()
		}).then(responseHandler);
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
	  
	
	  function responseHandler(response) {
		  if (response.ok) {
			return response.json()
		  }
		  throw alert('Something went wrong')
	  }