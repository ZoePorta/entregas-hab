'use strict';
let firstNumber = 3;
let secondNumber = 2;
let operador = 'suma';

if (operador === 'suma') {
  console.log(firstNumber + secondNumber);
} else if (operador === 'resta') {
  console.log(firstNumber - secondNumber);
} else if (operador === 'multiplicacion') {
  console.log(firstNumber * secondNumber);
} else if (operador === 'division') {
  console.log(firstNumber / secondNumber);
} else if (operador === 'potencia') {
  console.log(firstNumber ** secondNumber);
} else {
  console.log('Opción no válida.');
}

switch (operador) {
  case 'suma':
    console.log(firstNumber + secondNumber);
    break;
  case 'resta':
    console.log(firstNumber - secondNumber);
    break;
  case 'multiplicacion':
    console.log(firstNumber * secondNumber);
    break;
  case 'division':
    console.log(firstNumber / secondNumber);
    break;
  case 'potencia':
    console.log(firstNumber ** secondNumber);
    break;
  default:
    console.log('Opción no válida.');
    break;
}
