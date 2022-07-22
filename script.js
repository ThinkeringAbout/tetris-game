let gameArray = [375].fill(0);
let gameCells = document.querySelectorAll('.cell');
let j = 0;

let zTetris = [0, 1, 16, 17];
let cubeTetris = [0, 1, 15, 16];

function next([a, b, c, d]) {
  gameArray[j+a] = 1;
  gameArray[j+b] = 1;
  gameArray[j+c] = 1;
  gameArray[j+d] = 1;
  if (j+d < 360 && gameArray[j+d+15] != 1) {
    j+=15;
  }
}

function refresh() {
  for (let i = 0; i < 375; i++) {
    if (gameArray[i] == 1) {
      gameCells[i].style.backgroundColor = 'red';
      gameArray[i] = 0;
    } else {
      gameCells[i].style.backgroundColor = 'white';
    }
  }
}


setInterval(function(){
  next(zTetris);
  refresh();
}, 1000);
