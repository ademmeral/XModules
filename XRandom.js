
export default class XRandom {

  static chars(length = 10, numbers = true) {
    const randChar = [
      [...Array(90).keys()].slice(65), /* a-z */
      [...Array(122).keys()].slice(97) /* A-Z */
    ];
    if (numbers) randChar.unshift( [...Array(57).keys()].slice(48) ); /* 0-9 */
    
    let str = '';
    for (let i = 0; i < length; i++) {
      const index = this.number(0, randChar.length - 1);
      const randCode = this.number(0, randChar[index].length - 1);
      str += String.fromCharCode(randChar[index][randCode]);
    }
    return str;
  }

  static shuffle(item){
    const newItem = [];
    if (item.constructor.name === 'Array'){
      while (item.length !== 0) {
        const index = Math.floor(Math.random() * item.length);
        newItem.push(item.splice(index, 1)[0])
      }
      return newItem;

    } else if (item.constructor.name === 'Object'){
      const entries = Object.entries(item);
      while (entries.length !== 0) {
        const index = Math.floor(Math.random() * entries.length);
        newItem.push(entries.splice(index, 1)[0])
      }
      return Object.fromEntries(newItem);
    } else return null;
  }

  static number(min = 50, max = 300){ 
    min = Math.round(min);
    max = Math.round(max);
    return Math.floor(Math.random() * (max - min) + min) + 1;
  };

  static numbers(from = 0, to = 1, amount, unique = true){
    if (from > to || amount >= (to - from) ) return null;
    const numbs = [];
    for (let i = from; i <= to; i++){
      let num = this.number(from, to);
      if (numbs.length === amount) return numbs;
      if (unique && numbs.includes(num)) continue;
      numbs.push(num);
    }
    return numbs;
  }
  
  static interval(callback, min = 1000, max = 7000 ){

    function handleInterval(){
      const randomDelay = Math.round( Math.random() * (max - min) + min );
      setTimeout(() => {
        console.log(randomDelay)
        callback();
        handleInterval();
      }, randomDelay)
    };
    handleInterval();
  }

  static timeout(callback, min = 1000, max = 3000){
    const randomDelay = this.number(min, max);
    setTimeout(callback, randomDelay);
  };

  static async asyncTimeout(min = 1000, max = 3000){
    const randomDelay = this.number(min, max)
    return new Promise(resolve => setTimeout(resolve, randomDelay))
  };

  static async * withAsyncDelay(arr = [], min = 1000, max = 7000 ){
    let i = 0;
    while (i < arr.length)
      yield await new Promise(resolve => {
        const randomDelay = this.number(min, max);
        setTimeout(() => { resolve(arr[i++]); }, randomDelay);
      })
  };
}

// console.log( XRandom.chars(30, false) )
// console.log( XRandom.chars(120) )
// console.log( XRandom.number(300, 700) );
// console.log(XRandom.shuffle({a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}))
// console.log(XRandom.shuffle([1,2,3,4,5,6]))

/* ==== INTERVAL ==== */

/*
let count = 0;
XRandom.interval(() => {
  console.log('This is a randomly-delayed callback ', ++count)
})
*/

/* ==== ASYNC DELAY ==== */

/*
async function getSth(){

  const myArr = ['A : Hi!', 'A : How r u?', 'B : Thanks. Im fine', 'B : How is it going?', 'A : So so'];
  const asyncItr = XRandom.withAsyncDelay(myArr, 5000, 500)
  for await (const sth of asyncItr)
    console.log(sth);
}
getSth();
*/