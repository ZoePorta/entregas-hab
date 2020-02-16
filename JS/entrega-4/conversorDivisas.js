'use strict';

//función para obtener la conversion de monedas

async function convertCoin(ammount, originalCoin, coinToGet) {
  //al usar tres parámetros podemos usar la misma función para cualquier conversion
  let value = //almaceno el valor para poder devolverlo y sacarlo por la consola sin repetir codigo ni recursividad
    ammount *
    (await (await fetch(`https://api.exchangerate-api.com/v4/latest/${originalCoin}`)).json()).rates[coinToGet];
  console.log(
    `${Math.round(ammount * 100) / 100} ${originalCoin} equivale/n a ${Math.round(value * 100) / 100} ${coinToGet}`
  );
  //al sacar el resultado se reducen los decimales a dos
  return value; //los decimales no pueden estar redondeados en el return porque afectaria a operaciones posteriores
}

//llamo a la función para obtener la conversion de EUR a USD y, una vez obtenido, utilizo el resultado para llamarla de nuevo y convertir de USD a JPY
convertCoin(prompt('¿Qué cantidad de euros quieres convertir?'), 'EUR', 'USD').then((ammount) => {
  return convertCoin(ammount, 'USD', 'JPY');
});

convertCoin(4, 'EUR', 'JPY');
