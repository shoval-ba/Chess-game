class state {
  constructor(piece, cell) {
    this.piece = piece;
    this.cell = cell;

  }

  getCell() {
    return this.cell
  }
}


class Piece {
  constructor(row, col, type, player) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.player = player;
    this.deleted = false
    this.initializePiece()
  }

  // Add the image on the piece
  appendPiece() {
    const cell = table.rows[this.row].cells[this.col];
    cell.appendChild(this.image);
  }

  // Add pieces to the board
  initializePiece() {
    this.image = document.createElement('img');
    this.image.src = "images/" + this.player + "." + this.type + '.png';
    this.image.className = "pieces"
    this.appendPiece()
  }

  // Change the loction of the piece
  changeLocation(row, col) {
    this.row = row;
    this.col = col;
  }

  // Change the loction and the image of the piece
  MoveLocation(row, col) {
    this.changeLocation(row, col);
    this.appendPiece();
  }

  // Delete piece from the board
  deletePiece() {
    // this.image.classList.remove("pieces");

    if (this.player === WHITE_PLAYER) {
      deletedWhite.appendChild(this.image);
    }

    if (this.player === BLACK_PLAYER) {
      deletedBlack.appendChild(this.image);
    }

    // this.image.remove();
    this.deleted = true;
    this.row = -1;
    this.col = -1;

  }

  // When pawn get to the end
  changePawnToQueen() {
    if (this.type === PAWN) {
      if (this.player === WHITE_PLAYER && this.row === 0) {
        this.type === QUEEN;
      }
      if (this.player === BLACK_PLAYER && this.row === 7) {
        this.type === QUEEN;
      }
    }
  }

  // Where the pieces can move
  possibleMoves() {

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
      console.log("Unknown type");
    }
  
    return filteredMoves;

  }

  isKing() {
    if (Piece.type === KING)
      return true
    else false
  }

  // If the cell on the board
  isExist(row, col) {
    return -1 < row && row < 8 && -1 < col && col < 8
  }

  // If the player is black or white
  isBlack(val = 0) {
    if (val) {
      return this.player.includes('black') ? val : -val
    }
    return this.player.includes('black')
  }

  // Where the pawn can move
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


    // can i eat front left

    let locationOccupied = boardData.getPiece(row + this.isBlack(1), col - 1)
    if (locationOccupied && locationOccupied.player !== this.player/* && locationOccupied.type !== KING*/) {
      moves.push([row + this.isBlack(1), col - 1])
    }

    // can i eat front right

    locationOccupied = boardData.getPiece(row + this.isBlack(1), col + 1)
    if (locationOccupied && locationOccupied.player !== this.player/* && locationOccupied.type !== KING*/) {
      moves.push([row + this.isBlack(1), col + 1])
    }
    return moves;

  }

  // Where the rook can move
  rookMoves() {
    let moves = [];
    let row = this.row
    let col = this.col

    // if(boardData.isThreat()===false){
    // bottom
    for (let i = row + 1; i < 8; i++) {
      let isOccupied = boardData.getPiece(i, col)
      if (!isOccupied || (this.player !== isOccupied.player /*&& isOccupied.type !== KING*/)) {
        moves.push([i, col])
        if (isOccupied) {
          break
        }
      } else break
    }

    // top
    for (let i = row - 1; i > -1; i--) {
      let isOccupied = boardData.getPiece(i, col)
      if (!isOccupied || (this.player !== isOccupied.player /*&& isOccupied.type !== KING*/)) {
        moves.push([i, col])
        if (isOccupied) {
          break
        }
      } else break
    }

    // right
    for (let i = col + 1; i < 8; i++) {
      let isOccupied = boardData.getPiece(row, i)
      if (!isOccupied || (this.player !== isOccupied.player /*&& isOccupied.type !== KING*/)) {
        moves.push([row, i])
        if (isOccupied) {
          break
        }
      } else break
    }

    // left
    for (let i = col - 1; i > -1; i--) {
      let isOccupied = boardData.getPiece(row, i)
      if (!isOccupied || (this.player !== isOccupied.player /*&& isOccupied.type !== KING*/)) {
        moves.push([row, i])
        if (isOccupied) {
          break
        }
      } else break
    }
    // }
    return moves;
  }

  // Where the king can move
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

  // Where the bishop can move
  bishopMoves() {
    let moves = [];

    let row = this.row;
    let col = this.col;
    let temp1 = col + 1;
    let temp2 = col - 1;

    // down and right
    for (let i = row + 1; i < 8; i++) {
      let isOccupied = boardData.getPiece(i, temp1)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp1 < 8 /*&& isOccupied.type !== KING*/) {
        moves.push([i, temp1])
        if (isOccupied) {
          temp1 = 8;
        }
      } else temp1 = 8
      temp1++

      // down and left
      isOccupied = boardData.getPiece(i, temp2)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp2 > -1 /*&& isOccupied.type !== KING*/) {
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
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp1 < 8 /*&& isOccupied.type !== KING*/) {
        moves.push([i, temp1])
        if (isOccupied) {
          temp1 = 8;
        }
      } else temp1 = 8;
      temp1++

      // up and left
      isOccupied = boardData.getPiece(i, temp2)
      if ((!isOccupied || (this.player !== isOccupied.player)) && temp2 > -1 /*&& isOccupied.type !== KING*/) {
        moves.push([i, temp2])
        if (isOccupied) {
          temp2 = -1;
        }
      } else temp2 = -1;
      temp2--

    }

    return moves;
  }

  // Where the knight can move
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
      if (!isOccupied || (this.player !== isOccupied.player) /*&& isOccupied.type !== KING*/)
        return true;
      return false
    })

    return moves;
  }

  // Where the queen can move
  queenMoves() {
    let moves = [];

    moves.push(...this.bishopMoves());
    moves.push(...this.rookMoves());

    return moves;
  }

}
