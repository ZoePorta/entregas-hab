"use strict";

import { convertCurrency, getCurrencyList } from "./conversorDivisas.js";

const APILink = "https://api.exchangerate-api.com/v4/latest/";

class UI {
  constructor(element, dataLink) {
    //seleccionar los elementos del documento
    this.element = element;
    this.dataLink = dataLink;

    this.form = this.element.querySelector("form");
    this.ammountInput = this.element.querySelector("#number");
    this.startSelector = this.element.querySelector("#startCurrency");
    this.toSelector = this.element.querySelector("#toCurrency");
    this.button = this.element.querySelector("button");

    this.resultText = this.element.querySelector("#result");

    this.convert();
  }

  //rellenar los select con la lista de divisas de la API
  fillSelects(dataList) {
    const fragment = document.createDocumentFragment();

    for (const data of dataList) {
      const option = document.createElement("option");
      option.setAttribute("value", data);
      option.textContent = data;
      fragment.append(option);
    }
    const fragmentClon = fragment.cloneNode(true);
    this.startSelector.innerHTML = "";
    this.startSelector.append(fragment);
    this.toSelector.innerHTML = "";
    this.toSelector.append(fragmentClon);
  }

  //convertir moneda al pulsar el botón
  convert() {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      const startCurrency = this.form.elements.startCurrency.value;
      const toCurrency = this.form.elements.toCurrency.value;
      const ammountInput = this.form.elements.number;
      const ammount = ammountInput.value;

      if (+ammount) {
        convertCurrency(APILink, ammount, startCurrency, toCurrency).then(
          result => {
            let trimResult = Math.round(result * 10000) / 10000;
            this.resultText.textContent = `${ammount} ${startCurrency} son ${trimResult} ${toCurrency}`;
          }
        );
        ammountInput.value = "";
        this.resultText.style.visibility = "visible";
      }
    });
  }
}

const converterUI = new UI(document.querySelector("#converter"), APILink);

getCurrencyList(APILink, "aed").then(response =>
  converterUI.fillSelects(response)
);
