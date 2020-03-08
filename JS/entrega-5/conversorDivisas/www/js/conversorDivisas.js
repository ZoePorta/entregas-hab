"use strict";

//función para obtener la conversion de monedas

async function convertCurrency(dataLink, ammount, startCurrency, toCurrency) {
  return (
    ammount *
    (await (await fetch(`${dataLink + startCurrency}`)).json()).rates[
      toCurrency
    ]
  );
}

//conseguir lista divisas
async function getCurrencyList(link, listStart) {
  return Object.keys((await (await fetch(`${link + listStart}`)).json()).rates);
}

export { convertCurrency, getCurrencyList };
