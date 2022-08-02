let cells = document.querySelectorAll('.cell');
let gameArray = [];
gameArray.length = 180;
gameArray.fill(0);

let zShape = [0, 1, 11, 12];
let reversezShape = [1, 2, 11, 10];
let cubeShape = [0, 1, 10, 11];
let lShape = [0, 1, 10, 20];
let jShape = [0, 1, 11, 21];
let tShape = [0, 10, 9, 11];

//let shapeArray = [zShape];
let shapeArray = [zShape, reversezShape, cubeShape, lShape, jShape, tShape];

let lShapeRotates = [
  [0, 1, 2, 12],
  [1,11,21,20],
  [0,10,11,12],
  [0, 1, 10, 20]
]

let tShapeRotates = [
  [0, 10, 11, 20],
  [9, 10, 11, 20],
  [0, 10, 20, 9],
  [0, 10, 9, 11]
]

let jShapeRotates = [
  [10, 11, 12, 2],
  [0, 10, 20, 21],
  [0, 1, 2, 10],
  [0, 1, 11, 21]
]

let zShapeRotates = [
  [1,10,11,20],
  [0, 1, 11, 12]
]

let reversezShapeRotates = [
  [0,10,11,21],
  [1,2,10,11]
]

let tmpzShape = zShape;
let tmpreversezShape = reversezShape;
let tmpcubeShape = cubeShape;
let tmplShape = lShape;
let tmpjShape = jShape;
let tmptShape = tShape;

let i = 0;
let offset = 15;

let active = change();

for (let x = 0; x < 18; x++) {
    cells[x*10].style.backgroundColor = "green";
    cells[(9+x*10)].style.backgroundColor = "green";
}

for (let x = 0; x < 10; x++) {
    cells[x].style.backgroundColor = "green";
    cells[x+170].style.backgroundColor = "green";
}

function change() {
  let res = Math.floor(Math.random() * shapeArray.length);
  return shapeArray[res];
}


function move() {
    gameArray[offset + (i)*10 + active[0]] = 1;
    gameArray[offset + (i)*10 + active[1]] = 1;
    gameArray[offset + (i)*10 + active[2]] = 1;
    gameArray[offset + (i)*10 + active[3]] = 1;
    let temp = active;

    i++;

    if (temp == tShape && temp != jShape) {
      gameArray[offset + (i-2)*10 + active[3]] = 1;
      if (active === tmpzShape || active === tmpreversezShape) {
      gameArray[offset + (i-2)*10 + active[2]] = 0;
    }  if (active === tmptShape || tShapeRotates[3]) {
      gameArray[offset + (i-2)*10 + active[1]] = 1;
      gameArray[offset + (i-2)*10 + active[2]] = 0;
      gameArray[offset + (i-2)*10 + active[3]] = 0;
    }  if (active == tShapeRotates[0]) {
      gameArray[offset + (i-2)*10 + active[1]] = 1;
      gameArray[offset + (i-2)*10 + active[3]] = 1;
    } if (active == tShapeRotates[1]) {
      gameArray[offset + (i-2)*10 + active[1]] = 0;
      gameArray[offset + (i-2)*10 + active[3]] = 1;
    }  if (active == tShapeRotates[2]) {
      gameArray[offset + (i-2)*10 + active[2]] = 1;
    }
  }


    if (cells[offset + i*10].style.backgroundColor == "green" ||
    cells[offset + i*10 + active[1]].style.backgroundColor == "green" ||
    cells[offset + i*10 + active[2]].style.backgroundColor == "green" ||
    cells[offset + i*10 + active[3]].style.backgroundColor == "green") {
        gameArray[offset + (i-1)*10 + active[0]] = 2;
        gameArray[offset + (i-1)*10 + active[1]] = 2;
        gameArray[offset + (i-1)*10 + active[2]] = 2;
        gameArray[offset + (i-1)*10 + active[3]] = 2;
        zShape = tmpzShape;
        reversezShape = tmpreversezShape;
        tShape = tmptShape;
        cubeShape = tmpcubeShape;
        jShape = tmpjShape;
        lShape = tmplShape;
        rotateIndex = 0;
        i = 0;
        offset = 15;
        for (let num = 0; num < 180; num+=10) {
          let sumArray = 0;
          for (let xNum = 0; xNum < 10; xNum++) {
            sumArray += gameArray[num+xNum];
            if (sumArray == 16) {
              console.log(num);
              clearRow(num);
            }
          }
        }
        active = change();
    }
}

function clearRow(num) {
  for (let j = 1; j <= 8; j++) {
    gameArray[num+j] = 0;
    cells[num+j].style.backgroundColor = 'white';
  }
  for (let j = 0; j < num+1; j++) {
    if (gameArray[j] == 2 && gameArray[j+10] == 0) {
      cells[j].style.backgroundColor = 'white';
      gameArray[j+10] = 2;
    }
  }
}

function draw() {
    for (let x = 0; x < gameArray.length; x++) {
        if (gameArray[x] == 1) {
            cells[x].style.backgroundColor = "red";
        } else if (gameArray[x] == 2) {
            cells[x].style.backgroundColor = "green";
        } else if (cells[x].style.backgroundColor != "green"){
            cells[x].style.backgroundColor = "white";
        }
    }
}


function go() {
  clearMovement();
    move();
    draw();
}

function clearMovement() {
  for (let x = 0; x < gameArray.length; x++) {
      if (gameArray[x] == 1) {
          gameArray[x] = 0;
        }
      }
}

let rotateIndex = 0;

function rotate() {
  if (offset != 11 && offset != 18) {
    if (active == lShape && offset != 17) {
      lShape = lShapeRotates[rotateIndex++];
      active = lShapeRotates[rotateIndex-1];
      if (rotateIndex == 4) {
        rotateIndex = 0;
      }
    }
    if (active == reversezShape && offset != 17) {
      reversezShape = reversezShapeRotates[rotateIndex++];
      active = reversezShapeRotates[rotateIndex-1];
      if (rotateIndex == 2) {
        rotateIndex = 0;
      }
    }
    if (active == zShape && offset != 17) {
      zShape = zShapeRotates[rotateIndex++];
      active = zShapeRotates[rotateIndex-1];
      if (rotateIndex == 2) {
        rotateIndex = 0;
      }
    }
    if (active == jShape && offset != 17) {
      jShape = jShapeRotates[rotateIndex++];
      active = jShapeRotates[rotateIndex-1];
      if (rotateIndex == 4) {
        rotateIndex = 0;
      }
    }
    if (active == tShape) {
      tShape = tShapeRotates[rotateIndex++];
      active = tShapeRotates[rotateIndex-1];
      if (rotateIndex == 4) {
        rotateIndex = 0;
      }
    }
    clearMovement();
    go();
  }
}

setInterval(go, 1000);
document.addEventListener('keydown', function(event) {
  if (event.code == "ArrowLeft") {
    if (active === tmptShape || active == tShapeRotates[1] || (active == tShapeRotates[2] && active != reversezShape)) {
      if (offset > 12) {
        offset--;
        clearMovement();
        go();
      }
    } else {
      if (offset >= 12) {
        offset--;
        clearMovement();
        go();
      }
    }
  } else if (event.code == "ArrowDown") {
    clearMovement();
    go();
  } else if (event.code == "ArrowRight") {
    if (active == zShapeRotates[0]) {
      if (offset < 17) {
        offset++;
        clearMovement();
        go();
      }
    } else
    if (active == reversezShapeRotates[0]) {
      if (offset < 17) {
        offset++;
        clearMovement();
        go();
      }
    }
    if (active === jShapeRotates[2] || active === jShapeRotates[0] || (active === zShape ) ||
  active == reversezShape || active == lShapeRotates[0] || active == lShapeRotates[2]) {
      if (offset < 16) {
        offset++;
        clearMovement();
        go();
      }
    } else
    if (active === tmptShape || active == tShapeRotates[1] || active == tShapeRotates[0] || active === tmpjShape ||
    active == jShapeRotates[0] || active == lShape || active == cubeShape) {
      if (offset < 17) {
        offset++;
        clearMovement();
        go();
      }
    } else {
      if (offset <= 17) {
        offset++;
        clearMovement();
        go();
      }
    }
  } else if (event.code == "Space") {
    rotate();
  }
})
