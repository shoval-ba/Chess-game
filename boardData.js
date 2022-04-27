class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
    this.turn = WHITE_PLAYER
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

  // Set location to the piece(on the click function) and delete the other piece if piece he eat him
  setLocation(row, col, piece) {
    if (this.turn === piece.player) {
      const isOccupied = this.getPiece(row, col);
      if (isOccupied) {
        isOccupied.deletePiece();
      }
      piece.MoveLocation(row, col);
      this.nextTurn();
    }
  }

  // To decide who`s turn
  nextTurn() {
    this.turn = this.turn == WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
  }

  // If the king is threat
  isThreat() {
    for (let piece of this.pieces) {
      let possibleMoves = piece.possibleMoves();
      for (let possibleMove of possibleMoves) {
        if (this.getPiece(possibleMove[0], possibleMove[1]).type === KING) {
          check.classList.remove("out");
          check.classList.add("check");
          isThreat = true;
        }
        // else
        //   isThreat = false
      }
    }
    check.classList.remove("check");
    check.classList.add("out");
    return isThreat
  }

  // Check if i can move when the king is threat
  checkIfCanMove(piece, possibleMoves = []) {
let curPiece = piece.piece
    let moves = possibleMoves.filter((move)=>{
      let row = curPiece.row
      let col = curPiece.col
      curPiece.changeLocation(move.row, move.col)
      let kingThreat = this.isThreat()
      curPiece.changeLocation(row, col)
      return !kingThreat
    })
    return moves
  }

}