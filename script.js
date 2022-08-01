let cells = document.querySelectorAll('.cell');
let gameArray = [];
gameArray.length = 180;
gameArray.fill(0);

let shapeArray = [];
let zShape = [0, -1, 11, 10];
let reversezShape = [0, 1, 9, 10];
let cubeShape = [0, 1, 10, 11];
shapeArray.push(zShape, reversezShape, cubeShape);

let i = 0;
let offset = 25;

let active = cubeShape;

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
    gameArray[offset + i*10 + active[0]] = 1;
    gameArray[offset + i*10 + active[1]] = 1;
    gameArray[offset + i*10 + active[2]] = 1;
    gameArray[offset + i*10 + active[3]] = 1;


    i++;
    gameArray[offset + (i-2)*10 + active[0]] = 0;
    gameArray[offset + (i-2)*10 + active[1]] = 0;
    if (active === zShape || active === reversezShape) {
      gameArray[offset + (i-2)*10 + active[2]] = 0;
    }
    //gameArray[offset + (i-2)*10 + 10] = 0;
    //gameArray[offset + (i-2)*10 + 11] = 0;


    if (cells[offset + i*10].style.backgroundColor == "green" || cells[offset + i*10].style.backgroundColor == "red" ||
    cells[offset + i*10 + active[1]].style.backgroundColor == "green" || cells[offset + i*10 + active[1]].style.backgroundColor == "red" ||
    cells[offset + i*10 + active[2]].style.backgroundColor == "green" || cells[offset + i*10 + active[2]].style.backgroundColor == "red" ||
    cells[offset + i*10 + active[3]].style.backgroundColor == "green" || cells[offset + i*10 + active[3]].style.backgroundColor == "red") {
        i = 0;
        offset = 5;
        active = change();
    }
}

function draw() {
    for (let x = 0; x < gameArray.length; x++) {
        if (gameArray[x] == 1) {
            cells[x].style.backgroundColor = "red";
        } else if (cells[x].style.backgroundColor != "green"){
            cells[x].style.backgroundColor = "white";
        }
    }
}


function go() {
    move();
    draw();
}

document.onclick = go;
