export function fetcher(query) {
  // console.log("fetcher");
  return fetch('https://code-word-list.witus.online/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data)
}