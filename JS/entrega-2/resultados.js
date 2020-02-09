'use strict';

const Maria = ['Maria', 62, 34, 55];
const Paula = ['Paula', 35, 60, 59];
const Rebeca = ['Rebeca', 40, 39, 63];
const seleccion = [Maria, Paula, Rebeca];

function getAverage(equipo) {
  let total = 0;
  for (let i = 1; i < equipo.length; i++) {
    total += equipo[i];
  }
  return total / (equipo.length - 1);
}

function getHigh(equipos) {
  let high = equipos[0];
  for (let i = 0; i < equipos.length; i++) {
    if (getAverage(high) < getAverage(equipos[i])) {
      high = equipos[i];
    }
  }
  return high[0];
}

console.log(getHigh(seleccion));
