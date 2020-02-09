'use strict';
const example = '¡Hoy es un día estupendo y fantástico!';

const re = /[.,\/#¡!¿?$%\^&\*;:{}=\-_`~()]/g;

function letterCount(str) {
  const strArray = str
    .toLowerCase()
    .replace(re, '')
    .split(' ');
  let longestWord = strArray[0];
  for (const word of strArray) {
    if (longestWord.length < word.length) {
      longestWord = word;
    }
  }
  return longestWord;
}

console.log(
  `La palabra más larga es "${letterCount(example)}" con una longitud de ${letterCount(example).length} letras.`
);
