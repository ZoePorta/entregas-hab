"use strict";

import { convertCurrency, getCurrencyList } from "./conversorDivisas.js";
import UI from "./UI.js";

const APILink = "https://api.exchangerate-api.com/v4/latest/";
const converterUI = new UI(document.querySelector("#converter"), APILink);

getCurrencyList(APILink, "aed").then(response =>
  converterUI.fillSelects(response)
);

convertCurrency(APILink, 3, "EUR", "JPY").then(data => console.log(data));
