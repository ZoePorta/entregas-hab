'use strict';

function rollDice() {
  let dice = Math.ceil(Math.random() * 10);
  if (dice > 6) {
    return rollDice();
  } else {
    return dice;
  }
}

function play() {
  let totalScore = 0;
  let points = 0;
  for (let i = 0; totalScore < 50; i++) {
    points = rollDice();
    totalScore += points;
    if (totalScore < 50) {
      console.log(`Tirada ${i + 1}: ha salido un ${points}. Tienes un total de ${totalScore} puntos.`);
    }
  }
  console.log(`¡Enhorabuena, ha salido un ${points}! ¡Has ganado con un total de ${totalScore} puntos!`);
}

play();
