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
let pieceOld = null;
let cell;
let opponent = true; // true for the white player false for the black player

class state {
  constructor(piece, cell) {
    this.piece = piece;
    this.cell = cell;

  }

  getCell() {
    return this.cell
  }
}

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


class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
  }
  //isEmpty(){

  //}
  changeLocation(row, col) {
    this.row = row;
    this.col = col;
  }

  // where the pieces can move
  possibleMoves() {
    let filteredMoves;
    if (this.type === PAWN) {
      filteredMoves = this.pawnMoves(this.player);
    } else if (this.type === ROOK) {
      filteredMoves = this.rookMoves();
    } else if (this.type === KNIGHT) {
      filteredMoves = this.knightMoves();
    } else if (this.type === BISHOP) {
      filteredMoves = this.bishopMoves();
    } else if (this.type === KING) {
      filteredMoves = this.kingMoves();
    } else if (this.type === QUEEN) {
      filteredMoves = this.queenMoves();
    }
    else {
      consoloe.log("Unknown type , type")
    }

    return filteredMoves;
  }

  // if the cell on the board
  isExist(row, col) {
    return -1 < row && row < 8 && -1 < col && col < 8
  }

  // if the player is black or white
  isBlack(val = 0) {
    if (val) {
      return this.player.includes('black') ? val : -val
    }
    return this.player.includes('black')
  }

  //  where the pawn can move
  pawnMoves() {
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

  //  where the rook can move
  rookMoves() {
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

    // top
    for (let i = row - 1; i > -1; i--) {
      let isOccupied = boardData.getPiece(i, col)
      if (!isOccupied || (this.player !== isOccupied.player)) {
        moves.push([i, col])
        if (isOccupied) {
          break
        }
      } else break
    }

    // right
    for (let i = col + 1; i < 8; i++) {
      let isOccupied = boardData.getPiece(row, i)
      if (!isOccupied || (this.player !== isOccupied.player)) {
        moves.push([row, i])
        if (isOccupied) {
          break
        }
      } else break
    }

    // left
    for (let i = col - 1; i > -1; i--) {
      let isOccupied = boardData.getPiece(row, i)
      if (!isOccupied || (this.player !== isOccupied.player)) {
        moves.push([row, i])
        if (isOccupied) {
          break
        }
      } else break
    }

    return moves;
  }

  //  where the king can move
  kingMoves() {

    let row = this.row;
    let col = this.col;

    let moves = [
      [row + 1, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row - 1, col - 1],
      [row - 1, col + 1],
      [row - 1, col],
      [row, col - 1],
      [row, col + 1]
    ];

    moves = moves.filter((move) => {
      if (!this.isExist(move[0], move[1]))
        return false;
      let isOccupied = boardData.getPiece(move[0], move[1])
      if (!isOccupied || (this.player !== isOccupied.player))
        return true;
      return false
    })

    return moves;
  }

  //  where the bishop can move
  bishopMoves() {
    let moves = [];

    let row = this.row;
    let col = this.col;
    let temp1 = col + 1;
    let temp2 = col - 1;

    // down and right
    for (let i = row + 1; i < 8; i++) {
      let isOccupied = boardData.getPiece(i, temp1)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp1 < 8) {
        moves.push([i, temp1])
        if (isOccupied) {
          temp1 = 8;
        }
      } else temp1 = 8
      temp1++

      // down and left
      isOccupied = boardData.getPiece(i, temp2)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp2 > -1) {
        moves.push([i, temp2])
        if (isOccupied) {
          temp2 = -1;
        }
      } else temp2 = -1;
      temp2--
    }

    // up and right
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

      // up and left
      isOccupied = boardData.getPiece(i, temp2)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp2 > -1) {
        moves.push([i, temp2])
        if (isOccupied) {
          temp2 = -1;
        }
      } else temp2 = -1;
      temp2--

    }

    return moves;
  }

  //  where the knight can move
  knightMoves() {
    let row = this.row;
    let col = this.col;

    let moves = [
      [row + 2, col + 1],
      [row + 2, col - 1],
      [row + 1, col + 2],
      [row + 1, col - 2],
      [row - 2, col + 1],
      [row - 2, col - 1],
      [row - 1, col - 2],
      [row - 1, col + 2]
    ];

    moves = moves.filter((move) => {
      if (!this.isExist(move[0], move[1]))
        return false;
      let isOccupied = boardData.getPiece(move[0], move[1])
      if (!isOccupied || (this.player !== isOccupied.player))
        return true;
      return false
    })

    return moves;
  }

  //  where the queen can move
  queenMoves() {
    let moves = [];

    moves.push(...this.bishopMoves());
    moves.push(...this.rookMoves());

    return moves;
  }
}

// when you click on one piece
function onCellClick(event, row, col) {

  // move the pieces
  if (pieceOld != null) {
    if (table.rows[row].cells[col].classList.contains('possible-move')) {
      if (pieceOld.piece.player === WHITE_PLAYER) {
        turn.textContent = "black turn"
      }
      else {
        turn.textContent = "white turn"
      }
      let image = pieceOld.getCell().firstChild;
      table.rows[row].cells[col].appendChild(image);
      boardData.getPiece(pieceOld.piece.row, pieceOld.piece.col).changeLocation(row, col);
      pieceOld = null;
      opponent = !opponent;
    }
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');


  // Show possible moves to the white player when it`s turn

  for (let piece of boardData.pieces) {
    if (piece.row === row && piece.col === col) {
      if (piece.player == WHITE_PLAYER && opponent) {
        pieceOld = new state(piece, selectedCell);
        let possibleMoves = piece.possibleMoves();
        for (let possibleMove of possibleMoves)
          table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
      }
    }
  }

  // Show possible moves to the black player when it`s turn

  for (let piece of boardData.pieces) {
    if (piece.row === row && piece.col === col) {
      if (piece.player == BLACK_PLAYER && !opponent) {
        pieceOld = new state(piece, selectedCell);
        let possibleMoves = piece.possibleMoves();
        for (let possibleMove of possibleMoves)
          table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
      }
    }
  }
}


// add the pieces
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
  image.src = "images/" + player + "." + type + '.png';
  image.className = "pieces"
  cell.appendChild(image);
}

// create chess board html
function createChessBoard() {
  // create background
  background = document.createElement('div');
  document.body.appendChild(background);
  background.classList.add("background")

  // create a title
  heading = document.createElement('H1');
  textNode = document.createTextNode("Chess game");
  heading.appendChild(textNode)
  background.appendChild(heading);
  heading.classList.add("h1")

  // create white turn/black turn
  turn = document.createElement('H1');
  textNodeTurn = document.createTextNode("white turn");
  turn.appendChild(textNodeTurn)
  background.appendChild(turn);
  turn.classList.add("turn");


  table = document.createElement('table');
  table.className = "table1"
  document.body.appendChild(table);
  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowElement = table.insertRow();
    for (let col = 0; col < BOARD_SIZE; col++) {
      cell = rowElement.insertCell();
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

  for (let piece of boardData.pieces) {
    addImage(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }

}

// call the function who crate the board
window.addEventListener('load', createChessBoard);