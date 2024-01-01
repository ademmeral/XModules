/**
 *@ADEMMERAL_xCallback
  https://github.com/ademmeral/XModules/blob/main/xCallback.js
*/

export function xCallback(fn) {
  const storage = new Map();

  return async (...args) => {
    if (storage.get(fn.name))
      return storage.get(fn.name);

    storage.set(fn.name, await fn(...args));
    return storage.get(fn.name);
  }
}


/***** EXAMPLE USAGE *****/

/*
let fetchData = async (url) => {
  try { return (await (await fetch(url)).json()); }
  catch ({ message }) { throw message; };
}

fetchData = xCallback(fetchData);

const myFancyButton = document.querySelector('button');
myFancyButton.addEventListener('click', () => {
  fetchData("https://jsonplaceholder.typicode.com/users")
    .then(console.log)
    .catch(console.error);
})
*/