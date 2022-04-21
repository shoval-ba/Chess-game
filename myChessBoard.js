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

class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
  }

  // Returns piece in row, col, or undefined if not exists.
  getPiece(row, col) {
    for (let piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
    return false;
  }
}

let boardData = new BoardData()
class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }

  changer(row, col) {
    this.row = row;
    this.col = col;
  }


  getPossibleMoves() {
    let filteredMoves;
    if (this.type === PAWN) {
      filteredMoves = this.getPawnRelativeMoves(this.player);
    } else if (this.type === ROOK) {
      filteredMoves = this.getRookRelativeMoves();
    } else if (this.type === KNIGHT) {
      filteredMoves = this.getKnightRelativeMoves();
    } else if (this.type === BISHOP) {
      filteredMoves = this.getBishopRelativeMoves();
    } else if (this.type === KING) {
      filteredMoves = this.getKingRelativeMoves();
    } else if (this.type === QUEEN) {
      filteredMoves = this.getQueenRelativeMoves();
    }
    else {
      consoloe.log("Unknown type , type")
    }

    // let absoluteMoves = [];
    // for (let relativeMove of relativeMoves) {
    //   const absoluteRow = this.row + relativeMove[0];
    //   const absoluteCol = this.col + relativeMove[1];
    //   absoluteMoves.push([absoluteRow, absoluteCol]);
    // }

    // let filteredMoves = [];
    // for (let absoluteMove of absoluteMoves) {
    //   const absoluteRow = absoluteMove[0];
    //   const absoluteCol = absoluteMove[1];
    //   if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
    //     // if (boardData.getPiece(absoluteRow, absoluteCol) === undefined) {
    //       filteredMoves.push(absoluteMove);
    //     // }
    //   }
    // }
    // console.log(filteredMoves)
    return filteredMoves;
  }

  isExist(row , col){
    return -1 < row && row < 8 && -1 < col && col < 8
  }


  isBlack(val = 0) {
    if (val) {
      return this.player.includes('black') ? val : -val
    }
    return this.player.includes('black')
  }

  getPawnRelativeMoves() {
    let moves = []

    let col = this.col
    let row = this.row

    if ((this.isBlack() ? row + 1 < 8 : row - 1 > 0) && !boardData.getPiece(row + this.isBlack(1), col)) {
      moves.push([row + this.isBlack(1), col])
    }

    if ((this.isBlack() ? row === 1 : row === 6) && !boardData.getPiece(row + this.isBlack(1), col) && !boardData.getPiece(row + this.isBlack(2), col)) {
      moves.push([row + this.isBlack(2), col])
    }


    // can it front left

    let locationOccupied = boardData.getPiece(row + this.isBlack(1), col - 1)
    if (locationOccupied && locationOccupied.player !== this.player) {

      moves.push([row + this.isBlack(1), col - 1])
    }

    // can i eat front right

    locationOccupied = boardData.getPiece(row + this.isBlack(1), col + 1)
    if (locationOccupied && locationOccupied.player !== this.player) {
      moves.push([row + this.isBlack(1), col + 1])
    }

    return moves;

    // if (this.row === 6) {
    //   if (player === WHITE_PLAYER) {
    //     return [[-1, 0], [-2, 0]]
    //   }
    // }
    // else if (player === WHITE_PLAYER) {
    //   return [[-1, 0]]
    // }
    // if (this.row === 1) {
    //   if (player === BLACK_PLAYER) {
    //     return [[1, 0], [2, 0]]
    //   }
    // }
    // else if (player === BLACK_PLAYER) {
    //   return [[1, 0]]
    // }

  }

  getRookRelativeMoves() {
    let moves = [];
    let row = this.row
    let col = this.col


    // bottom
    for (let i = row + 1; i < 8; i++) {
      let isOccupied = boardData.getPiece(i, col)
      if (!isOccupied || (this.player !== isOccupied.player)) {
        moves.push([i, col])
        if (isOccupied) {
          break
        }
      } else break
    }

    for (let i = row - 1; i > -1; i--) {
      let isOccupied = boardData.getPiece(i, col)
      if (!isOccupied || (this.player !== isOccupied.player)) {
        moves.push([i, col])
        if (isOccupied) {
          break
        }
      } else break
    }

    for (let i = col + 1; i < 8; i++) {
      let isOccupied = boardData.getPiece(row, i)
      if (!isOccupied || (this.player !== isOccupied.player)) {
        moves.push([row, i])
        if (isOccupied) {
          break
        }
      } else break
    }

    for (let i = col - 1; i > -1; i--) {
      let isOccupied = boardData.getPiece(row, i)
      if (!isOccupied || (this.player !== isOccupied.player)) {
        moves.push([row, i])
        if (isOccupied) {
          break
        }
      } else break
    }

    // for (let i = 1; i < BOARD_SIZE; i++) {
    //   result.push([i, 0]);
    //   result.push([-i, 0]);
    //   result.push([0, i]);
    //   result.push([0, -i]);
    // }
    return moves;
  }

  getKingRelativeMoves() {

    let row = this.row;
    let col = this.col;

    let moves = [
      [row+1, col+1],
      [row+1, col-1],
      [row+1, col],
      [row-1, col-1],
      [row-1, col+1],
      [row-1, col],
      [row, col-1],
      [row, col+1]
    ];

    moves = moves.filter((move)=> {
      if(!this.isExist(move[0] , move[1]))
        return false;
      let isOccupied = boardData.getPiece(move[0] , move[1])
      if (!isOccupied || (this.player !== isOccupied.player))
        return true;
      return false
    })

    return moves;

  //   let result = [];
  //   for (let row = -1; row <= 1; row++) {
  //     for (let col = -1; col <= 1; col++) {
  //       if (!(row === 0 && col === 0)) {
  //         result.push([row, col])
  //       }
  //     }
  //   }
  //   return result;
  }

  getBishopRelativeMoves() {
    let moves = [];

    let row = this.row;
    let col = this.col;
    let temp1 = col + 1;
    let temp2 = col - 1;

    for (let i = row + 1; i < 8; i++) {
      let isOccupied = boardData.getPiece(i, temp1)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp1 < 8) {
        moves.push([i, temp1])
        if (isOccupied) {
          temp1 = 8;
        }
      } else temp1 = 8
      temp1++

      isOccupied = boardData.getPiece(i, temp2)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp2 > -1) {
        moves.push([i, temp2])
        if (isOccupied) {
          temp2 = -1;
        }
      } else temp2 = -1;
      temp2--
    }

    temp1 = col + 1
    temp2 = col - 1
    for (let i = row - 1; i > -1; i--) {
      let isOccupied = boardData.getPiece(i, temp1)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp1 < 8) {
        moves.push([i, temp1])
        if (isOccupied) {
          temp1 = 8;
        }
      } else temp1 = 8;
      temp1++

      isOccupied = boardData.getPiece(i, temp2)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp2 > -1) {
        moves.push([i, temp2])
        if (isOccupied) {
          temp2 = -1;
        }
      } else temp2 = -1;
      temp2--

    }


    // for (let i = 1; i < BOARD_SIZE; i++) {
    //   result.push([i, i]);
    //   result.push([-i, i]);
    //   result.push([i, -i]);
    //   result.push([-i, -i]);

    // }
    return moves;
  }

  getKnightRelativeMoves() {
    let row = this.row;
    let col = this.col;

    let moves = [
      [row+2, col+1],
      [row+2, col-1],
      [row+1, col+2],
      [row+1, col-2],
      [row-2, col+1],
      [row-2, col-1],
      [row-1, col-2],
      [row-1, col+2]
    ];

    moves = moves.filter((move)=> {
      if(!this.isExist(move[0] , move[1]))
        return false;
      let isOccupied = boardData.getPiece(move[0] , move[1])
      if (!isOccupied || (this.player !== isOccupied.player))
        return true;
      return false
    })


    // for (let row = -2; row <= 2; row++) {
    //   for (let col = -2; col <= 2; col++) {
    //     if (!(row === 0 || col === 0)) {
    //       if (!(row === col || row === -col)) {
    //         result.push([row, col])
    //       }
    //     }
    //   }
    // }
    return moves;
  }

  getQueenRelativeMoves() {
    let moves = [];

    moves.push(...this.getBishopRelativeMoves());
    moves.push(...this.getRookRelativeMoves());

    // for (let i = 1; i < BOARD_SIZE; i++) {
    //   result.push([i, i]);
    //   result.push([-i, i]);
    //   result.push([i, -i]);
    //   result.push([-i, -i]);
    //   result.push([i, 0]);
    //   result.push([-i, 0]);
    //   result.push([0, i]);
    //   result.push([0, -i]);
    // }
    return moves;
  }
}

function onCellClick(event, row, col) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  // Show possible moves
  for (let piece of boardData.pieces) {
    if (piece.row === row && piece.col === col) {
      //console.log(piece);
      let possibleMoves = piece.getPossibleMoves();
      for (let possibleMove of possibleMoves)
        table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
    }
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
    result.push(new Piece(1, i, PAWN, BLACK_PLAYER))
    result.push(new Piece(6, i, PAWN, WHITE_PLAYER))
  }
  return result;
}

function addPieces(result, row, player) {
  result.push(new Piece(row, 0, ROOK, player))
  result.push(new Piece(row, 1, KNIGHT, player))
  result.push(new Piece(row, 2, BISHOP, player))
  result.push(new Piece(row, 4, QUEEN, player))
  result.push(new Piece(row, 3, KING, player))
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
  boardData = new BoardData(piecesOnBoard());
  // boardData.getPiece(0, 3).changer(5, 4)
  // boardData.getPiece(7, 3).changer(5, 6)
  // boardData.getPiece(7,0).changer(5,2)
  // boardData.getPiece(7,7).changer(5,6)

  for (let piece of boardData.pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}

window.addEventListener('load', createChessBoard);