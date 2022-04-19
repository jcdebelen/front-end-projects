let board = [['','',''],['','',''],['','','']];
let moves = [];
let player;
const dom = document;
let win=0;

dom.getElementById('O').addEventListener('click', function() {
    player = 'O';
    select();
    oSpanColor();
})

dom.getElementById('X').addEventListener('click', function() {
    player = 'X';
    select();
    xSpanColor();
})

function select() {
    dom.getElementById('start').style.display = 'none';
    dom.getElementById('maingame').style.display = 'flex'
    dom.getElementById('turn').innerHTML = ' ' + player + ' ';
}


const cells = dom.getElementsByClassName('cell');
let x;
for (let i=0;i<cells.length;i++) {
    cells[i].addEventListener('click', function() {
        if (win === 1) {
        }
        else if (cells[i].innerHTML === "") {
            x=i;
            x=Math.floor(x/3);
            playerColor(i);
            if (i>2) {
                i=i%3;
            }
            board[x][i] = player;
            updateCells();
            changeplayer();
            moves.push(structuredClone(board));
            dom.getElementById('turn').innerHTML = ' ' + player + ' ';
            checkWin();  
            i=null;x=null;
            if (moves.length == 9) {
                    playerW(2);
            };
        }
    })
}

let z;
function updateCells() {
    for (let a=0;a<3;a++) {
        for (let b=0;b<3;b++) {
            z=(a*3)+b;
            cells[z].innerHTML = '';
            if (board[a][b] === 'X') {
                cells[z].innerHTML = 'X';
            }
            else if (board[a][b] === 'O') {
                cells[z].innerHTML = 'O';
            }
        }
    }
}

function changeplayer () {
    if (player === 'O') {
        player = 'X';
    }
    else if (player === 'X') {
        player = 'O';
    }
}

function xSpanColor() {
    dom.getElementById('turn').style.color = 'black';
    dom.getElementById('turn').style.textShadow = '1px 1px white';
}

function oSpanColor() {
    dom.getElementById('turn').style.color = 'white';
    dom.getElementById('turn').style.textShadow = '1px 1px black';
}

function playerColor(i) {
    if (player === 'O') {
        cells[i].style.color = 'white';
        cells[i].style.textShadow = '1px 1px black';
        xSpanColor();
    }
    else if (player === 'X') {
        cells[i].style.color = 'black';
        cells[i].style.textShadow = '1px 1px white';
        oSpanColor();   
    }
}

let h;
function playerW(a = 0) {
    win=1;
    if (a===0) {
        dom.getElementById('player').innerHTML = 'Player O wins!';
        showControls ()
    }
    else if (a===1) {
        dom.getElementById('player').innerHTML = 'Player X wins!';
        showControls ()
    }
    else if (a===2) {
        dom.getElementById('player').innerHTML = 'Tied Game!';
        dom.getElementById('reset').style.visibility = 'visible';
        dom.getElementById('reset').style.animation = 'fadeIn 2s';
    }
    dom.getElementById('player').style.color = 'white';
    dom.getElementById('player').style.textShadow = '2px 2px black';
    h=moves.length-1;
    dom.getElementById('movenum').innerHTML = 'Move number: ' + parseInt(h+1);
    disableButton();
    dom.getElementById('player').style.animation = 'breath 4s';

}

function showControls () {
    dom.getElementById('controls').style.visibility = 'visible';
    dom.getElementById('controls').style.animation = 'fadeIn 3s';
}

// Check Win
let o;
function checkWin() {
    if (board[0][0] === 'O' && board[0][1] ==='O' && board[0][2] === 'O') {
        playerW(0);
    }
    else if (board[1][0] === 'O' && board[1][1] ==='O' && board[1][2] === 'O') {
        playerW(0);
    }
    else if (board[2][0] === 'O' && board[2][1] ==='O' && board[2][2] === 'O') {
        playerW(0);
    }
    else if (board[0][0] === 'O' && board[1][0] ==='O' && board[2][0] === 'O') {
        playerW(0);
    }
    else if (board[0][1] === 'O' && board[1][1] ==='O' && board[2][1] === 'O') {
        playerW(0);
    }
    else if (board[0][2] === 'O' && board[1][2] ==='O' && board[2][2] === 'O') {
        playerW(0);
    }
    else if (board[0][0] === 'O' && board[1][1] ==='O' && board[2][2] === 'O') {
        playerW(0);
    }
    else if (board[0][2] === 'O' && board[1][1] ==='O' && board[2][0] === 'O') {
        playerW(0);
    }
    else if (board[0][0] === 'X' && board[0][1] ==='X' && board[0][2] === 'X') {
        playerW(1);
    }
    else if (board[1][0] === 'X' && board[1][1] ==='X' && board[1][2]=== 'X') {
        playerW(1);
    }
    else if (board[2][0] === 'X' && board[2][1] ==='X' && board[2][2]=== 'X') {
        playerW(1);
    }
    else if (board[0][0] === 'X' && board[1][0] ==='X' && board[2][0] === 'X') {
        playerW(1);
    }
    else if (board[0][1] === 'X' && board[1][1] ==='X' && board[2][1] === 'X') {
        playerW(1);
    }
    else if (board[0][2] === 'X' && board[1][2] ==='X' && board[2][2] === 'X') {
        playerW(1);
    }
    else if (board[0][0] === 'X' && board[1][1] ==='X' && board[2][2] === 'X') {
        playerW(1);
    }
    else if (board[0][2] === 'X' && board[1][1] ==='X' && board[2][0] === 'X') {
        playerW(1);
    }
}

dom.getElementById('prev').addEventListener('click', function() {
    if (h>0) {
        h--;
        board=moves[h];
        updateCells();
        disableButton();
        dom.getElementById('movenum').innerHTML = 'Move number: ' + parseInt(h+1);
    }
});

dom.getElementById('next').addEventListener('click', function() {
    if (h<(moves.length-1)) {
        h++;
        board=moves[h];
        updateCells();
        disableButton();
        dom.getElementById('movenum').innerHTML = 'Move number: ' + parseInt(h+1);
    }
});


function disableButton() {
    if (h===0) {
        dom.getElementById('prev').style.backgroundColor = "#e7e7e7";
        document.getElementById("prev").disabled = true;
    }
    else if (h===moves.length-1) {
        dom.getElementById('next').style.backgroundColor = "#e7e7e7";
        document.getElementById("next").disabled = true;
    }
    else {
        dom.getElementById('next').style.backgroundColor = "#4CAF50";
        dom.getElementById('prev').style.backgroundColor = "#008CBA";
        document.getElementById("prev").disabled = false;
        document.getElementById("next").disabled = false;
    }
}

dom.getElementById('reset').addEventListener('click', function() {
    location.reload();
});
