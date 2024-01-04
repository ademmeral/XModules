"use strict"

/**
  * @ADEMMERAL_XSTORAGE
  * https://github.com/ademmeral/xmodules/blob/main/XStorage.js
*/

export default class XStorage {
  // privates
  #handler = {
    get: (target, prop, rec) => {
      // Check if prop is a valid array index
      if (prop in target) return target[prop];
      else return null;
    },
    set: (t, k, v, rec) => {
      const result = Reflect.set(t, k, v, rec);
      return result;
    }
  };
  #target = {
    current : null,
    previous : null
  };
  #proxy = new Proxy(this.#target, this.#handler);
  // constructing
  constructor(state = null) {
    if (state !== null)
      this.#proxy.current = state;
  };
  // methods
  get current(){
    return this.#proxy.current;
  };
  set current(newState = null){
    this.#proxy.previous = this.#proxy.current;
    this.#proxy.current = newState;
  };
  get previous(){
    return this.#proxy.previous;
  };
}

/* ======= EXAMPLE USAGE ======= */
/*
const storage = new XStorage('example state');

console.log(storage.state); // example state

storage.on('STATE_CHANGE', () => {
  console.log(storage.state); 
  // first trigger output : "another example"
  // second trigger output : "something else"
});

storage.state = 'another example';  // first trigger
storage.state = 'something else';   // second trigger
*/