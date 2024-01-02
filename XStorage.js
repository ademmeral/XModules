import XTarget from "./XTarget.js"; 

/**
  *@ADEMMERAL_XSTORAGE
    https://github.com/ademmeral/XModules/blob/main/XStorage.js

  *@ADEMMERAL_XTARGET
    https://github.com/ademmeral/XModules/blob/main/XTarget.js
*/

export default class XStorage extends XTarget {
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
  #storage = {
    current : null,
    previous : null
  };
  #proxy = new Proxy(this.#storage, this.#handler);
  constructor(state = null) {
    super();
    this.#proxy.current = state;
  };
  get state(){
    return this.#proxy.current;
  };
  set state(newState = null){
    this.#proxy.previous = this.#proxy.current;
    this.#proxy.current = newState;
    this.emit('STATE_CHANGE', { 
      previous: this.#proxy.previous, 
      current: this.#proxy.current 
    });
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