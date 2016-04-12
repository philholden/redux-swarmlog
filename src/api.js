
export function generateKeys() {
  return fetch(`/keys`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'text/plain'
    }
  })
  .then((res) => {
    if (res.status >= 400) {
      throw new Error('Bad response from server')
    }
    return res.json()
  })
  .catch(function (err) {
    throw new Error('Bad response from server: ', err.message)
  })
}
