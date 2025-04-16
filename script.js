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
const vitorias = document.querySelector(".vitorias");
const victory = document.getElementById('victory');
const close = document.getElementById('close-overlay');
const winner = document.getElementById('winner');

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

      vez.innerHTML = "Vez do Player-2";
    } else {
      velhaP2.push(velha.id);

      velha.classList.add("escolhidaP2");
      velha.innerHTML = "O";

      escolhidaP1 = false;
      escolhidaP2 = true;

      vez.innerHTML = "Vez do Player-1";
    }

    if (checkWin(velhaP1)) {
      p1Win += 1;
      lock = true;
      winner.innerHTML = "O player-1 ganhou"
    }

    if (checkWin(velhaP2)) {
      p2Win += 1;
      lock = true;
      winner.innerHTML = "O player-2 ganhou"
    }

    if (velhaP1.length === 5 && !checkWin(velhaP1)) {
      lock = true
      winner.innerHTML = "Deu velha!"
      vez.innerHTML = "O jogo acabou";
    }

    if(lock){
      victoryAppear()
      setTimeout(() => {
        clearGame();
      }, 500);
      setTimeout(()=>{
        closeOverlay();
      }, 5000)
    } 

    vitorias.innerHTML = `Player-1 ${p1Win} X ${p2Win} Player-2`;
  });
});

function clearGame() {
  velhaP1 = [];
  velhaP2 = [];

  escolhidaP1 = false;
  escolhidaP2 = false;

  vez.innerHTML = "Vez do Player-1";

  lock = false;

  velhas.forEach((velha) => {
    velha.innerHTML = "";
    velha.classList.remove("escolhidaP1");
    velha.classList.remove("escolhidaP2");
  });
}

function victoryAppear(){
  victory.style.opacity = '1';
  victory.style.zIndex = '20';

}

function closeOverlay() {
  victory.style.opacity = '0'
  victory.style.zIndex = '0'
}

close.addEventListener('click', closeOverlay);


