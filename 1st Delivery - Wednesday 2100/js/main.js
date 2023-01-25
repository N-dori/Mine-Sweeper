'use strict'
const MINE = '💣'
const EMPTY = ''
const FLAG = '🚩'
const SCERED = "😬"
const HAPPY = "😁"
const SAD = "😞"
var gLevel = {
    size: 4,
    mines: 2,
}
var gBoard
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}
//onInit()
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
}, true);

function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    console.log(gBoard);
}
function changeLevel(num) {
    gLevel.size = num
    gLevel.mines = num / 2
    onInit()
}
function checkGameOver() {
    var mineMarked = 0
    var nonMineShown = 0
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine) {
                if (currCell.isShown) mineMarked++
            } else {
                if (currCell.isShown) nonMineShown++
            }
        }
    }
    if(mineMarked===gLevel.mines &&
         nonMineShown===(gLevel**2)-gLevel.mines){
            console.log('victory');
            
         }
}
function handelNewGame() {

}



function renderCell(location, value) {
    // Select the elCell and set the value
    elCell.innerHTML = value
}
function handelRightclick(elCell) {
    console.log('hi');
    if (elCell.isMarked === true) {
        elCell.isMarked = false
        elCell.innerHTML = ""
    } else {
        elCell.isMarked = true
        elCell.innerHTML = FLAG
    }
}

function cellClicked(elCell) {
    var i = +elCell.dataset.i
    var j = +elCell.dataset.j
    if (gBoard[i][j].isMine) {
        elCell.innerHTML = MINE
    } else {
        elCell.innerHTML = gBoard[i][j].minesAroundCount
        gBoard[i][j].isShown = true
        console.log('gbord', gBoard);

    }
    checkGameOver()
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var mineCount = 0
    if (board[rowIdx][colIdx].isMine) return
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board.length) continue
            var currCell = board[i][j]
            if (currCell.isMine === true) mineCount++
        }
    }
    if (mineCount === 0) return EMPTY
    return mineCount
}

function renderBoard(board) {
    var strHTML = ''
    for (let i = 0; i < gLevel.size; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < gLevel.size; j++) {
            var cell = board[i][j]
            if (cell.isMine === false) {
                cell.minesAroundCount = setMinesNegsCount(board, i, j)
            }
            const className = `cell cell-${i}-${j}`
            strHTML += `<td data-i="${i}" data-j="${j} "class="${className}"
             onclick="cellClicked(this)"oncontextmenu="handelRightclick(this)" >
            </td>`

        }
        var elTable = document.querySelector('.board')
        elTable.innerHTML = strHTML
    }

}


function buildBoard() {
    var size = gLevel['size']
    var board = createMat(size, size)
    for (let i = 0; i < gLevel.size; i++) {
        for (let j = 0; j < gLevel.size; j++) {
            const cell = {
                minesAroundCount: '',
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            board[i][j] = cell
        }
    }
    setMinesOnBoard(board)
    return board
}

function setMinesOnBoard(board) {
    //     for (let i = 0; i < gLevel.mines; i++) {
    //  board[getRandomInt(0,board.length)][getRandomInt(0,board.length)].isMine = true

    //     }
    board[2][3].isMine = true
    board[0][2].isMine = true
}



function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push()
        }
        mat.push(row)
    }
    return mat
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
