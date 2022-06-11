const protocol = 'http';
const serverHost = '192.168.0.151:9000';
//const wsClient = new W3CWebSocket(`ws://${serverHost}/web-socket`);

async function get(path, passedInToken) {
  const jwtToken = null;
  const response = await fetch(`${protocol}://${serverHost}/${path}`, {
    method: 'GET',
    headers: {
      Host: serverHost,
      Accept: 'application/json',
      'jwt-token': jwtToken,
    },
  });
  return response.json();
}

async function post(path, body) {
  const jwtToken = null;
  const response = await fetch(`${protocol}://${serverHost}/${path}`, {
    method: 'POST',
    headers: {
      Host: serverHost,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'jwt-token': jwtToken,
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

function resource(path) {
  const readOnlyJwtToken = null;
  return `${protocol}://${serverHost}/${path}`;
}

// async function postMultipartForm(path, body) {
//   const state = appStore.getState();
//   const jwtToken = state.app.loginInfo ? state.app.loginInfo.jwtToken : null;
//   const response = await fetch(`${protocol}://${serverHost}/${path}`, {
//     method: 'POST',
//     headers: {
//       Host: serverHost,
//       Accept: 'multipart/form-data',
//       'Content-Type': 'multipart/form-data',
//       'jwt-token': jwtToken,
//     },
//     body,
//   });
//   return response.json();
// }

export {get, post, resource};
