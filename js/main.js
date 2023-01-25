'use strict'
const MINE = '💣'
const EMPTY = ''
const FLAG = '🚩'
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

function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    console.log(gBoard);
   
    var c= setMinesNegsCount(gBoard, 1, 2)
    console.log('c',c);
}
 function renderCell(location, value) {
    // Select the elCell and set the value
    elCell.innerHTML = value
}
function cellClicked(elCell){
    var i= +elCell.dataset.i
    var j= +elCell.dataset.j
     elCell.innerHTML = gBoard[i][j].minesAroundCount
}

function setMinesNegsCount(board, rowIdx, colIdx) {
    var mineCount = 0
    if(board[rowIdx][colIdx].isMine)return
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board.length) continue
            var currCell = board[i][j]
            if (currCell.isMine === true) mineCount++
        }
    } 
    if (mineCount===0) return EMPTY
        return mineCount
}

function renderBoard(board) {
    var strHTML = ''
    for (let i = 0; i < gLevel.size; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < gLevel.size; j++) {
            var cell = board[i][j]
            if(cell.isMine===false){
                cell.minesAroundCount= setMinesNegsCount(board, i, j) 
            }   
            const className = `cell cell-${i}-${j}`
            strHTML += `<td data-i="${i}" data-j="${j} "class="${className}" onclick="cellClicked(this)">
            ${cell.isMine ? MINE :EMPTY}</td>`
            
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
                isMarked: true,
            }
            board[i][j] = cell

        }
    }
    setMinesOnBoard(board)
    return board
}

function setMinesOnBoard(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if ((i === 2 && j === 3) || (i === 0 && j === 2)) {
                board[i][j].isMine = true

            }

        }

    }
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
