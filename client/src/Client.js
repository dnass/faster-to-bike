//Client makes a call to Express proxy, returns JSON
const search = (origin, destination) => {
  return fetch(`api/${origin}/${destination}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { search };
export default Client;
