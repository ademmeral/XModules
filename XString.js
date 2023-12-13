
export class XString {

  static capitalize(str = '') { return str[0].toUpperCase() + str.slice(1) };

  static capitalizeAll(str) { return str.split(' ').map(word => this.capitalize(word)).join(' ') };

  static isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z]*/gi, '');
    let flag = true;
    first:
    for (let i = str.length - 1; i > (str.length / 2) - 1;) {
      for (let x = 0; x < str.length / 2; x++) {
        if (str[i] != str[x]) flag = false;
        i--;
        if (!flag) break first;
      }
    };
    return flag;
  };

  static insert(text, char, index) {
    return text.slice(0, index) + char + text.slice(index)
  };

  static palindromize(str) {
    // give me "ab", I'll give you aba. Give me "rota", I'll give you "rotator". I hope I made sense;
    const original = str;       // just keepsake  
    for (let i = 0; i < str.length - 1; i++) {
      const check = this.isPalindrome(str);
      if (!check)
        str = this.insert(str, str[i], str.length - i);
    }
    return str;
  };

  static compactByChars(str, limit){
    const endsWithDot = str.slice(0, limit).endsWith('.');
    return endsWithDot 
      ? str.slice(0, limit) + '..' 
      : str.slice(0, limit) + '...';
  };

  static compactByWords(str, limit){
    const splitted = str.split(' ').slice(0, limit);
    const endsWithDot = splitted.slice(0, limit).endsWith('.');
    return endsWithDot 
      ? splitted.slice(0, limit) + '..' 
      : splitted.slice(0, limit) + '...';
  };

  static count(word = ''){
    return word.match(new RegExp(word, 'g')).length
  };

  static toBase = function(str, radix = 16){
    return str.split('').map((ch,i) => str.charCodeAt(i))
      .map(code => code.toString(radix)).join(' ');
  }
}


/* ======= EXAMPLE USAGE ========= */
/* 
const text = 'lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi odio iure atque\
 iusto quasi porro nihil neque quod consectetur vel.'

console.log( XString.capitalize('john doe') );
console.log( XString.capitalizeAll(text) );
*/

// ____Palindromising____
/*
console.log( XString.palindromize('rot') );
console.log( XString.palindromize('rota') );
console.log( XString.palindromize('abc') );
console.log( XString.palindromize('repa') );
console.log( XString.palindromize('kay') );
*/

// ____Into binary data____

console.log(XString.toBase('anExampleText', 2))           // 1100001 1101110 1000101 1111000 1100001 ...
console.log(XString.toBase('anotherExampleText', 16))    // 61 6e 6f 74 68 65 72 45 78 61 6d ...