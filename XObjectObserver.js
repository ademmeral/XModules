export class XObjectObserver extends EventTarget {
  #handler = {
    get: (target, prop, rec) => {
      // Check if prop is a valid array index
      if (prop in target) return target[prop];
      else return null;
    },
    set: (t, k, v, rec) => {
      const prevVal = t[k];
      const result = Reflect.set(t, k, v, rec);
      this.dispatchEvent(new CustomEvent(
        'changed', { detail: { previous, current: v } }
      ));
      return result;
    }
  };

  constructor(object) {
    super();
    this.proxy = new Proxy(object, this.#handler);
  }
}


/* ======== EXAMPLE USAGE =========== */

const newInst = new XObjectObserver([1, 2, 3, 4]);

newInst.addEventListener('changed', (e) => {
  console.log('value changed...', e.detail);
});

newInst.proxy[2] = 88 // The event above will be triggered
