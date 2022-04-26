const dom = document;

let board;
let moves;
let player = "";
let win;
let playerTurnDisplay;
const cells = dom.getElementsByClassName("cell");

//New Game
function reset() {
  dom.getElementById("cover").style.animation = "none";
  dom.getElementById("controls").style.visibility = "hidden";
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

//Animate Board
function animateBoard() {
  dom.getElementById("cover").style.animation = "spread 0.4s";
}

//div Player
let playerShape;
let shapeO = '<div class="shapeO"></div>';
let shapeX = '<div class="shapeX"></div>';

//Select player O
dom.getElementById("O").addEventListener("click", function () {
  select();
  player = "O";
  playerShape = shapeO;
  oSpanColor();
});
//Select player X
dom.getElementById("X").addEventListener("click", function () {
  select();
  player = "X";
  playerShape = shapeX;
  xSpanColor();
});

function select() {
  dom.getElementById("start").style.display = "none";
  dom.getElementById("maingame").style.display = "flex";
  setTimeout(displayTurn, 300);
}

function displayTurn() {
  dom.getElementById("turn").innerHTML = " " + playerTurnDisplay + " ";
  dom.getElementById("player").style.display = "block";
  dom.getElementById("player").style.visibility = "visible";
  dom.getElementById("score").style.visibility = "visible";
  dom.getElementById("score").style.animation = "fadeIn .5s";
}

function xSpanColor() {
  playerTurnDisplay = "✖";
  dom.getElementById("oScorediv").style.borderStyle = "none";
  dom.getElementById("xScorediv").style.borderStyle = "none none solid none";
  dom.getElementById("turn").style.color = "rgb(75, 75, 75)";
  dom.getElementById("turn").style.textShadow = "2px 2px white";
  dom.getElementById("turn").innerHTML = " " + playerTurnDisplay + " ";
}

function oSpanColor() {
  playerTurnDisplay = "O";
  dom.getElementById("xScorediv").style.borderStyle = "none";
  dom.getElementById("oScorediv").style.borderStyle = "none none solid none";
  dom.getElementById("turn").style.color = "white";
  dom.getElementById("turn").style.textShadow = "2px 2px black";
  dom.getElementById("turn").innerHTML = " " + playerTurnDisplay + " ";
}

//Cell Event Listener
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    if (win === 0) {
      if (cells[i].innerHTML === "") {
        cells[i].innerHTML = playerShape;
        board[Math.floor(i / 3)][i % 3] = player;
        moves.push(structuredClone(board));
        checkWinV2();
        changeplayer();
      }
    }
  });
}

//Change Player
function changeplayer() {
  if (player === "O") {
    player = "X";
    playerShape = shapeX;
    setTimeout(xSpanColor, 200);
  } else if (player === "X") {
    player = "O";
    playerShape = shapeO;
    setTimeout(oSpanColor, 200);
  }
}

//Check Win V2
function checkWinV2() {
  //Horizontal Check
  for (i = 0; i < 3; i++) {
    if (board[i][0] !== "") {
      let check = board[i][0];
      if (board[i][0] === board[i][1] && board[i][2] === check) {
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
      if (board[0][i] === board[1][i] && board[2][i] === check) {
        dom.getElementById("v" + i.toString()).style.visibility = "visible";
        dom.getElementById("v" + i.toString()).style.animation = "extendV 0.7s";
        playerW(check);
      }
    }
  }
  //Diagonal Check
  if (board[1][1] !== "") {
    check = board[1][1];
    if (board[0][0] === board[1][1] && board[2][2] === check) {
      dom.getElementById("d1").style.visibility = "visible";
      dom.getElementById("d1").style.animation = "diagEx 0.7s";
      playerW(check);
    } else if (board[0][2] === board[1][1] && board[2][0] === check) {
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

let h; // history
let xscore = 0; // X score counter
let oscore = 0; // O score counter
function playerW(input) {
  win = 1;
  if (input === "O") {
    dom.getElementById("player").style.visibility = "hidden";
    dom.getElementById("congrats").style.color = "rgb(75, 75, 75)";
    dom.getElementById("congrats").innerHTML =
      '<span id="playercolor">O</span> WINS!';
    dom.getElementById("playercolor").style.color = "white";
    oscore++;
    dom.getElementById("oScore").innerHTML = oscore;
    setTimeout(sayCongrats, 600);
  } else if (input === "X") {
    dom.getElementById("player").style.visibility = "hidden";
    dom.getElementById("congrats").innerHTML =
      '<span id="playercolor">✖</span> WINS!';
    dom.getElementById("congrats").style.color = "white";
    dom.getElementById("playercolor").style.color = "rgb(75, 75, 75)";
    xscore++;
    dom.getElementById("xScore").innerHTML = xscore;
    setTimeout(sayCongrats, 600);
  } else if (input === 0) {
    dom.getElementById("congrats").style.color = "white";
    dom.getElementById("congrats").innerHTML = "DRAW!";
    sayCongrats();
  }
  h = moves.length - 1;
  disableButton();
  showControls();
}

function sayCongrats() {
  dom.getElementById("player").style.display = "none";
  dom.getElementById("congrats").style.display = "flex";
}

function showControls() {
  dom.getElementById("controls").style.visibility = "visible";
  dom.getElementById("controls").style.animation = "fadeIn 1.5s";
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

//Disable button
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

//Update HTML Cells
function updateCells() {
  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 3; b++) {
      let z = a * 3 + b;
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

//Continue game
dom.getElementById("newgame").addEventListener("click", function () {
  dom.getElementById("controls").style.animation = "fadeOut 0.8s";
  setTimeout(reset, 350);
});

//Reset game
dom.getElementById("reset").addEventListener("click", function () {
  location.reload();
});

//removeHistory Animation
function removeAnim(index) {
  var anim = cells[index].children;
  anim[0].style.animation = "none";
}

//hide winning lines
function hideLines() {
  const lines = dom.getElementsByTagName("hr");
  for (let i = 0; i < lines.length; i++) {
    lines[i].style.visibility = "hidden";
    lines[i].style.animation = "none";
  }
}
