const dom = document;

let board;
let moves;
let player;
let win;
let z;
const cells = dom.getElementsByClassName("cell");

function reset() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  moves = [];
  win = 0;
  dom.getElementById("controls").style.visibility = "hidden";
  dom.getElementById("controls").style.animation = "none";
  updateCells();
  dom.getElementById("player").style.display = "block";
  dom.getElementById("congrats").style.display = "none";
}
reset();

//Select player
dom.getElementById("O").addEventListener("click", function () {
  player = "O";
  select();
  oSpanColor();
});

dom.getElementById("X").addEventListener("click", function () {
  player = "X";
  select();
  xSpanColor();
});

function select() {
  dom.getElementById("start").style.display = "none";
  dom.getElementById("maingame").style.display = "flex";
  dom.getElementById("cover").style.animation = "spread 0.5s";
  dom.getElementById("cover").style.height = "60vmin";
  dom.getElementById("cover").style.width = "60vmin";
  setTimeout(displayTurn, 300);
}

function displayTurn() {
  dom.getElementById("player").style.visibility = "visible";
  dom.getElementById("player").style.animation = "fadeIn .5s";
  dom.getElementById("turn").innerHTML = " " + player + " ";
  dom.getElementById("score").style.visibility = "visible";
}

//Cell Event Listener
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    if (win === 1) {
    } else if (cells[i].innerHTML === "") {
      playerColor(i);
      board[Math.floor(i / 3)][i % 3] = player;
      updateCells();
      changeplayer();
      moves.push(structuredClone(board));
      dom.getElementById("turn").innerHTML = " " + player + " ";
      checkWinV2();
    }
  });
}

//Display to HTML
function updateCells() {
  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 3; b++) {
      z = a * 3 + b;
      cells[z].innerHTML = "";
      if (board[a][b] === "X") {
        cells[z].innerHTML = "X";
      } else if (board[a][b] === "O") {
        cells[z].innerHTML = "O";
      }
    }
  }
}

//Change Player
function changeplayer() {
  if (player === "O") {
    player = "X";
  } else if (player === "X") {
    player = "O";
  }
}

//Change Player Color
function xSpanColor() {
  dom.getElementById("turn").style.color = "rgb(41, 41, 41)";
  dom.getElementById("turn").style.textShadow = "1px 1px white";
}

function oSpanColor() {
  dom.getElementById("turn").style.color = "#e5efc1";
  dom.getElementById("turn").style.textShadow = "1px 1px black";
}

function playerColor(i) {
  if (player === "O") {
    cells[i].style.color = "#e5efc1";
    cells[i].style.textShadow = "1px 1px black";
    xSpanColor();
  } else if (player === "X") {
    cells[i].style.color = "rgb(41, 41, 41)";
    cells[i].style.textShadow = "1px 1px white";
    oSpanColor();
  }
}

let xscore = 0;
let oscore = 0;
let h;
function playerW(a) {
  win = 1;
  if (a === "O") {
    dom.getElementById("congrats").innerHTML = "Player O wins!";
    dom.getElementById("player").style.display = "none";
    dom.getElementById("congrats").style.display = "block";
    oscore++;
    dom.getElementById("oScore").innerHTML = oscore;
  } else if (a === "X") {
    dom.getElementById("congrats").innerHTML = "Player X wins!";
    dom.getElementById("player").style.display = "none";
    dom.getElementById("congrats").style.display = "block";
    xscore++;
    dom.getElementById("xScore").innerHTML = xscore;
  } else if (a === 0) {
    dom.getElementById("congrats").innerHTML = "DRAW!";
    dom.getElementById("player").style.display = "none";
    dom.getElementById("congrats").style.display = "block";
  }
  dom.getElementById("congrats").style.color = "white";
  dom.getElementById("congrats").style.textShadow = "2px 2px black";
  h = moves.length - 1;
  disableButton();
  dom.getElementById("congrats").style.animation = "breath 4s";
  showControls();
}

function showControls() {
  dom.getElementById("controls").style.visibility = "visible";
  dom.getElementById("controls").style.animation = "fadeIn 3s";
}

//Check Win V2
let check;
function checkWinV2() {
  //Horizontal Check
  for (i = 0; i < 3; i++) {
    if (board[i][0] !== "") {
      check = board[i][0];
      if (
        board[i][0] === check &&
        board[i][1] === check &&
        board[i][2] === check
      ) {
        playerW(check);
      }
    }
  }
  //Vertical Check
  for (i = 0; i < 3; i++) {
    if (board[0][i] !== "") {
      check = board[0][i];
      if (
        board[0][i] === check &&
        board[1][i] === check &&
        board[2][i] === check
      ) {
        playerW(check);
      }
    }
  }
  //Diagonal Check
  if (board[1][1] !== "") {
    check = board[1][1];
    if (
      board[0][0] === check &&
      board[1][1] === check &&
      board[2][2] === check
    ) {
      playerW(check);
    } else if (
      board[0][2] === check &&
      board[1][1] === check &&
      board[2][0] === check
    ) {
      playerW(check);
    }
  }
  if (win === 0) {
    if (moves.length === 9) {
      playerW(0);
    }
  }
}

//Controls
dom.getElementById("prev").addEventListener("click", function () {
  if (h > 0) {
    h--;
    board = moves[h];
    updateCells();
    disableButton();
  }
});

dom.getElementById("next").addEventListener("click", function () {
  if (h < moves.length - 1) {
    h++;
    board = moves[h];
    updateCells();
    disableButton();
  }
});

function disableButton() {
  if (h === 0) {
    dom.getElementById("prev").style.backgroundColor = "#e7e7e7";
    document.getElementById("prev").disabled = true;
  } else if (h === moves.length - 1) {
    dom.getElementById("next").style.backgroundColor = "#e7e7e7";
    document.getElementById("next").disabled = true;
  } else {
    dom.getElementById("next").style.backgroundColor = "#6fc772";
    dom.getElementById("prev").style.backgroundColor = "#008CBA";
    document.getElementById("prev").disabled = false;
    document.getElementById("next").disabled = false;
  }
}

//New game
dom.getElementById("newgame").addEventListener("click", function () {
  reset();
});

//Reset game
dom.getElementById("reset").addEventListener("click", function () {
  location.reload();
});
