/**
 * @ADEMMERAL_XARRAY
 * https://github.com/ademmeral/XModules/blob/main/XArray.js
*/

export class XArray{

  static numbers(from = 0, to = 1)  // sorted numbers
  { return [...Array(to + 1).keys()].slice(from) };

  static letters(lowercase = true){ // sorted letters
    return [...Array(lowercase ? 91 : 123).keys()].slice(lowercase ? 65 : 97)
      .map(code => String.fromCharCode(code));
  }
}

// console.log(XArray.shuffle([1,2,3,4,5,6,7,8,9,0]))
// console.log(XArray.shuffle(['a','b','c','d','e','f','g','h','i']))