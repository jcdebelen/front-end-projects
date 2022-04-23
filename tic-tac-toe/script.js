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
  dom.getElementById("controls").style.visibility = "hidden";
  dom.getElementById("player").style.display = "block";
  dom.getElementById("player").style.visibility = "hidden";
  dom.getElementById("player").style.animation = "none";
  dom.getElementById("congrats").style.display = "none";
  hideLines();
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  moves = [];
  win = 0;
  updateCells();
  setTimeout(animateBoard, 50);
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
    dom.getElementById("player").style.visibility = "hidden";
    oscore++;
    dom.getElementById("congrats").innerHTML =
      '<span id="playercolor">O</span> wins!';
    dom.getElementById("playercolor").style.textShadow = "3px 3px black";
    dom.getElementById("oScore").innerHTML = oscore;
    setTimeout(sayCongrats, 500);
  } else if (a === "X") {
    dom.getElementById("player").style.visibility = "hidden";
    dom.getElementById("congrats").innerHTML =
      '<span id="playercolor">✖</span> wins!';
    dom.getElementById("playercolor").style.color = "rgb(75, 75, 75)";
    dom.getElementById("playercolor").style.textShadow = "none";
    xscore++;
    dom.getElementById("xScore").innerHTML = xscore;
    setTimeout(sayCongrats, 500);
  } else if (a === 0) {
    dom.getElementById("congrats").innerHTML = "DRAW!";
    sayCongrats();
  }
  h = moves.length - 1;
  disableButton();
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

function sayCongrats() {
  dom.getElementById("player").style.display = "none";
  dom.getElementById("congrats").style.display = "block";
  dom.getElementById("congrats").style.visibility = "hidden";
  dom.getElementById("congrats").style.visibility = "visible";
  dom.getElementById("congrats").style.animation = "spreadOutIn 1.5s";
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
        dom.getElementById("h" + i.toString()).style.visibility = "visible";
        dom.getElementById("h" + i.toString()).style.animation = "extend 0.7s";
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
        dom.getElementById("v" + i.toString()).style.visibility = "visible";
        dom.getElementById("v" + i.toString()).style.animation = "extendV 0.7s";
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
      dom.getElementById("d1").style.visibility = "visible";
      dom.getElementById("d1").style.animation = "diagEx 0.7s";
      playerW(check);
    } else if (
      board[0][2] === check &&
      board[1][1] === check &&
      board[2][0] === check
    ) {
      dom.getElementById("d2").style.visibility = "visible";
      dom.getElementById("d2").style.animation = "diag2Ex 0.7s";
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
    hideLines();
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
  dom.getElementById("controls").style.animation = "fadeOut 1s";
  setTimeout(reset, 350);
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

//hide winning lines
function hideLines() {
  const lines = dom.getElementsByTagName("hr");
  for (let i = 0; i < lines.length; i++) {
    lines[i].style.visibility = "hidden";
    lines[i].style.animation = "none";
  }
}
