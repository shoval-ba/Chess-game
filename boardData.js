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
  
    isThreat() {
      for (let piece of this.pieces) {
        let possibleMoves = piece.possibleMoves();
        for (let possibleMove of possibleMoves) {
          if (this.getPiece(possibleMove[0], possibleMove[1]).type === KING) {
            check.classList.remove("out");
            check.classList.add("check");
            console.log("is threat");
            isThreat = true;
          }
          // else
          //   isThreat = false
        }
      }
      check.classList.remove("check");
      check.classList.add("out");
      console.log(isThreat)
      return isThreat
    }
  
    checkIfCanMove(piece) {
  
      let possibleMoves = piece.piece.possibleMoves();
      for (let possibleMove of possibleMoves) {
        pieceNew = new state(piece, cell);
  
        pieceNew.player = piece.player
        pieceNew.type = piece.type
        pieceNew.row = possibleMove[0]
        pieceNew.col = possibleMove[1]
        pieceNew.cell = possibleMove
  
        this.setLocation(pieceNew.row, pieceNew.col, pieceOld)
        console.log(pieceNew)
  
        this.isThreat()
        if (isThreat === true) {
          console.log("not move");
          canMove = false;
        }
        else {
          console.log("yes move");
          canMove = true;
        }
  
      }
    }
  
  }