
export function xMemo(fn) {
  // You can use known object literal instead of Map. I just wanted to show off... Lol
  const storage = new Map();

  return async (...args) => {
    if (storage.get(fn.name))
      return ['from storage', ...storage.get(fn.name)];

    storage.set(fn.name, await fn(...args));
    return ['from api', ...storage.get(fn.name)];
  }
}


/***** EXAMPLE USAGE *****/

/*
let fetchData = async (url) => {
  try { return (await (await fetch(url)).json()); }
  catch ({ message }) { throw message; };
}
// And the one of the important benefits of "decorators" is heap-friendly
fetchData = xMemo(fetchData);

const myFancyButton = document.querySelector('button');
myFancyButton.addEventListener('click', () => {
  fetchData("https://jsonplaceholder.typicode.com/users")
    .then(console.log)
    .catch(console.error);
})
*/