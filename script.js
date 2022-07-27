let cells = document.querySelectorAll('.cell');
let gameArray = [];
gameArray.length = 180;
gameArray.fill(0);

let i = 0;
let offset = 25;

for (let x = 0; x < 18; x++) {
    cells[x*10].style.backgroundColor = "green";
    cells[(9+x*10)].style.backgroundColor = "green";
}

for (let x = 0; x < 10; x++) {
    cells[x].style.backgroundColor = "green";
    cells[x+170].style.backgroundColor = "green";
}


function move() {
    gameArray[offset + i*10] = 1;
    gameArray[offset + i*10 - 1] = 1;
    gameArray[offset + i*10 + 11] = 1;
    gameArray[offset + i*10 + 10] = 1;
    
    
    i++;
    gameArray[offset + (i-2)*10] = 0;
    gameArray[offset + (i-2)*10 - 1] = 0;
    gameArray[offset + (i-2)*10 + 11] = 0;
    gameArray[offset + (i-2)*10 + 10] = 0;
    
    if (cells[offset + i*10].style.backgroundColor == "green" || cells[offset + i*10].style.backgroundColor == "red") {
        i = 0;
        offset = 5;
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