const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

const PAWN = "pawn";
const ROOK = "rook";
const KNIGHT = "knight";
const BISHOP = "bishop";
const KING = "king";
const QUEEN = "queen";

let selectedCell;
let pieces = [];
let table;

//  class BoardData {
//   constructor(pieces) {
//     this.pieces = pieces;
//   }

//   // Returns piece in row, col, or undefined if not exists.
//   getPiece(row, col) {

//   }
// } 

class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  getPossibleMoves() {
    let relativeMoves;
    if (this.type === PAWN) {
      relativeMoves = this.getPawnRelativeMoves(this.player);
    } else if (this.type === ROOK) {
      relativeMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      relativeMoves = this.getKnightRelativeMoves();
    } else if (this.type === BISHOP) {
      relativeMoves = this.getBishopRelativeMoves();
    } else if (this.type === KING) {
      relativeMoves = this.getKingRelativeMoves();
    } else if (this.type === QUEEN) {
      relativeMoves = this.getQueenRelativeMoves();
    }
    else {
      consoloe.log("Unknown type , type")
    }

    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    }

    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  getPawnRelativeMoves(player) {
    if(this.row===6){
      if (player === WHITE_PLAYER){
        return [[-1,0],[-2,0]]
      } 
    } 
    else if(player === WHITE_PLAYER) {
      return [[-1,0]]
    }
    if(this.row===1){
      if (player === BLACK_PLAYER){
        return [[1,0],[2,0]]
      }
    }
    else if(player === BLACK_PLAYER){
      return [[1,0]]
    }
  
  }

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }

  getKingRelativeMoves() {
    let result = [];
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (!(row === 0 && col === 0)) {
          result.push([row, col])
        }
      }
    }
    return result;
  }

  getBishopRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, i]);
      result.push([-i, i]);
      result.push([i, -i]);
      result.push([-i, -i]);
    }
    return result;
  }

  getKnightRelativeMoves() {
    let result = [];
    for (let row = -2; row <= 2; row++) {
      for (let col = -2; col <= 2; col++) {
        if (!(row === 0 || col === 0)) {
          if (!(row === col || row === -col)) {
            result.push([row, col])
          }
        }
      }
    }
    return result;
  }

  getQueenRelativeMoves() {
    let result = [];
    for (let i = 1; i < BOARD_SIZE; i++) {
      result.push([i, i]);
      result.push([-i, i]);
      result.push([i, -i]);
      result.push([-i, -i]);
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
}

function onCellClick(event, row, col) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
    }
  }

  // Show possible moves
  for (let piece of pieces) {
    if (piece.row === row && piece.col === col) {
      console.log(piece, "i am  here");
      let possibleMoves = piece.getPossibleMoves();
      for (let possibleMove of possibleMoves)
        table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
    }
  }
  // Clear previously selected cell
  if (selectedCell !== undefined) {
    selectedCell.classList.remove('selected');
  }
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');
}

// FUNCTION THAT ADD THE PICESES
function piecesOnBoard() {
  let result = [];
  addPieces(result, 0, BLACK_PLAYER);
  addPieces(result, 7, WHITE_PLAYER);
  for (i = 0; i < 8; i++) {
    result.push(new Piece(1, i, "pawn", BLACK_PLAYER))
    result.push(new Piece(6, i, "pawn", WHITE_PLAYER))
  }
  return result;
}

function addPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player))
  result.push(new Piece(row, 1, KNIGHT, player))
  result.push(new Piece(row, 2, BISHOP, player))
  result.push(new Piece(row, 3, QUEEN, player))
  result.push(new Piece(row, 4, KING, player))
  result.push(new Piece(row, 5, BISHOP, player))
  result.push(new Piece(row, 6, KNIGHT, player))
  result.push(new Piece(row, 7, ROOK, player))
}

function addImage(cell, player, type) {
  const image = document.createElement('img');
  image.src = player + "." + type + '.png';
  image.className = "pieces"
  cell.appendChild(image);
}



// create chess board html
function createChessBoard() {
  table = document.createElement('table');
  table.className = "table1"
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = rowElement.insertCell();
      if ((row + col) % 2 === 0) {
        cell.className = "square blacksquare";
      } else {
        cell.className = "square whitesquare";
      }
      cell.addEventListener('click', (event) => onCellClick(event, row, col));
    }
  }

  // add pieces to the board 
  pieces = piecesOnBoard();
  pieces[0].getPossibleMoves();
  pieces[4].getPossibleMoves();

  console.log(pieces)
  for (let piece of pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener('load', createChessBoard);