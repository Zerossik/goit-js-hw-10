export function getDate(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=flags,name`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
