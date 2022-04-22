const dom = document;

let board;
let moves;
let player = "";
let win;
let z;
let h;
let playerTurnDisplay;
const cells = dom.getElementsByClassName("cell");

function reset() {
  dom.getElementById("cover").style.animation = "none";
  dom.getElementById("controls").style.animation = "none";
  dom.getElementById("controls").style.visibility = "hidden";
  dom.getElementById("congrats").style.display = "none";
  dom.getElementById("player").style.display = "block";
  dom.getElementById("player").style.visibility = "hidden";
  dom.getElementById("player").style.animation = "none";
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  moves = [];
  win = 0;
  updateCells();
  setTimeout(animateBoard, 300);
  if (player !== "") {
    setTimeout(displayTurn, 700);
  }
}
reset();

let playerShape;
let shapeO = '<div class="shapeO"></div>';
let shapeX = '<div class="shapeX"></div>';

//Select player
dom.getElementById("O").addEventListener("click", function () {
  player = "O";
  playerShape = shapeO;
  playerTurnDisplay = "O";
  oSpanColor();
  select();
});

dom.getElementById("X").addEventListener("click", function () {
  player = "X";
  playerShape = shapeX;
  playerTurnDisplay = "✖";
  xSpanColor();
  select();
});

function select() {
  dom.getElementById("start").style.display = "none";
  dom.getElementById("maingame").style.display = "flex";
  animateBoard();
  setTimeout(displayTurn, 300);
}

function animateBoard() {
  dom.getElementById("cover").style.animation = "spread 0.4s";
  dom.getElementById("cover").style.height = "60vmin";
  dom.getElementById("cover").style.width = "60vmin";
}

function displayTurn() {
  dom.getElementById("player").style.display = "block";
  dom.getElementById("player").style.visibility = "visible";
  dom.getElementById("player").style.animation = "fadeIn .5s";
  dom.getElementById("turn").innerHTML = " " + playerTurnDisplay + " ";
  dom.getElementById("score").style.visibility = "visible";
  dom.getElementById("score").style.animation = "fadeIn .5s";
}

//Cell Event Listener
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    if (win === 1) {
    } else if (cells[i].innerHTML === "") {
      cells[i].innerHTML = playerShape;
      board[Math.floor(i / 3)][i % 3] = player;
      changeplayer();
      setTimeout(playerColor, 400);
      moves.push(structuredClone(board));
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
        cells[z].innerHTML = shapeX;
        removeAnim(z);
      } else if (board[a][b] === "O") {
        cells[z].innerHTML = shapeO;
        removeAnim(z);
      }
    }
  }
}

//Change Turn Design Color
function xSpanColor() {
  dom.getElementById("oScorediv").style.borderStyle = "none";
  dom.getElementById("turn").style.color = "rgb(41, 41, 41)";
  dom.getElementById("turn").style.textShadow = "2px 2px white";
  dom.getElementById("xScorediv").style.borderStyle = "none none solid none";
  dom.getElementById("turn").innerHTML = " " + playerTurnDisplay + " ";
}

function oSpanColor() {
  dom.getElementById("xScorediv").style.borderStyle = "none";
  dom.getElementById("turn").style.color = "white";
  dom.getElementById("turn").style.textShadow = "2px 2px black";
  dom.getElementById("oScorediv").style.borderStyle = "none none solid none";
  dom.getElementById("turn").innerHTML = " " + playerTurnDisplay + " ";
}

function playerColor() {
  if (player === "O") {
    oSpanColor();
  } else if (player === "X") {
    xSpanColor();
  }
}

//Change Player
function changeplayer() {
  if (player === "O") {
    player = "X";
    playerShape = shapeX;
    playerTurnDisplay = "✖";
  } else if (player === "X") {
    player = "O";
    playerShape = shapeO;
    playerTurnDisplay = "O";
  }
}

let xscore = 0;
let oscore = 0;
function playerW(a) {
  win = 1;
  if (a === "O") {
    dom.getElementById("congrats").innerHTML = "O wins!";
    dom.getElementById("player").style.display = "none";
    dom.getElementById("congrats").style.display = "block";
    oscore++;
    dom.getElementById("oScore").innerHTML = oscore;
  } else if (a === "X") {
    dom.getElementById("congrats").innerHTML = "✖ wins!";
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
  dom.getElementById("congrats").style.animation = "spreadOutIn 1.5s";
  showControls();

  var elementsX = document.getElementsByClassName("shapeX");
  for (i = 0; i < elementsX.length; i++) {
    elementsX[i].style.animation = "none";
    console.log(elementsX);
  }

  var elementsO = document.getElementsByClassName("shapeO");
  for (i = 0; i < elementsO.length; i++) {
    elementsO[i].style.animation = "none";
  }
}

function showControls() {
  dom.getElementById("controls").style.visibility = "visible";
  dom.getElementById("controls").style.animation = "fadeIn 1.5s";
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
    disableButton();
    updateCells();
  }
});

dom.getElementById("next").addEventListener("click", function () {
  if (h < moves.length - 1) {
    h++;
    board = moves[h];
    disableButton();
    updateCells();
  }
});

let o;
let x;
function disableButton() {
  if (h === 0) {
    dom.getElementById("prev").style.backgroundColor = "#e7e7e7";
    document.getElementById("prev").disabled = true;
  } else if (h === moves.length - 1) {
    dom.getElementById("next").style.backgroundColor = "#e7e7e7";
    document.getElementById("next").disabled = true;
  } else {
    dom.getElementById("next").style.backgroundColor = "#6fc77270";
    dom.getElementById("prev").style.backgroundColor = "#008bba81";
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

//removeHistory Animation
function removeAnim(z) {
  var anim = cells[z].children;
  anim[0].style.visibility = "hidden";
  anim[0].style.animation = "none";
  anim[0].style.visibility = "visible";
}
