let escolhidaP1 = false;
let escolhidaP2 = false;
let lock = false;

let velhaP1 = [];
let velhaP2 = [];

const winningCombinations = [
  ["left-top", "center-top", "right-top"],
  ["left-center", "center-center", "right-center"],
  ["left-bottom", "center-bottom", "right-bottom"],
  ["left-top", "left-center", "left-bottom"],
  ["center-top", "center-center", "center-bottom"],
  ["right-top", "right-center", "right-bottom"],
  ["left-top", "center-center", "right-bottom"],
  ["right-top", "center-center", "left-bottom"],
];

function checkWin(playerMoves) {
  return winningCombinations.some((combination) =>
    combination.every((cell) => playerMoves.includes(cell))
  );
}

let p1Win = 0;
let p2Win = 0;

const velhas = document.querySelectorAll(".velhas");
const vez = document.getElementById("vez");
const vitorias = document.getElementById("vitorias");

velhas.forEach((velha) => {
  velha.addEventListener("click", () => {
    if (velhaP1.includes(velha.id) || velhaP2.includes(velha.id) || lock)
      return;
    if (escolhidaP1 === false) {
      velhaP1.push(velha.id);

      velha.classList.add("escolhidaP1");
      velha.innerHTML = "X";

      escolhidaP2 = false;
      escolhidaP1 = true;

      vez.innerHTML = "Vez do Player 2";
    } else {
      velhaP2.push(velha.id);

      velha.classList.add("escolhidaP2");
      velha.innerHTML = "O";

      escolhidaP1 = false;
      escolhidaP2 = true;

      vez.innerHTML = "Vez do Player 1";
    }

    if (checkWin(velhaP1)) {
      p1Win += 1;
      lock = true;
      setTimeout(() => {
        clearGame();
      }, 1000);
    }

    if (checkWin(velhaP2)) {
      p2Win += 1;
      lock = true;
      setTimeout(() => {
        clearGame();
      }, 1000);
    }

    if (velhaP1.length === 5) {
      vez.innerHTML = "O jogo acabou";
      setTimeout(() => {
        clearGame();
      }, 1000);
    }

    vitorias.innerHTML = `Player-1 ${p1Win} X ${p2Win} Player-2`;
  });
});

function clearGame() {
  velhaP1 = [];
  velhaP2 = [];

  escolhidaP1 = false;
  escolhidaP2 = false;

  vez.innerHTML = "Vez do Player 1";

  lock = false;

  velhas.forEach((velha) => {
    velha.innerHTML = "";
    velha.classList.remove("escolhidaP1");
    velha.classList.remove("escolhidaP2");
  });
}
