'use strict';

const test = '¡Arriba la birra!';

const re = /[.,\/#¡!¿?$%\^&\*;:{}=\-_`~()\s]/g;

function palindromeTwo(str) {
  const cleanString = str.toLowerCase().replace(re, '');
  const reversedString = cleanString
    .split('')
    .reverse()
    .join('');
  return cleanString === reversedString;
}

console.log(palindromeTwo(test) + `: ${test}${palindromeTwo(test) ? '' : ' no'} es palíndromo.`);
