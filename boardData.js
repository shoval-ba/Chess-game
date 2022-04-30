class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
    this.turn = WHITE_PLAYER
    this.opppentPosibleMove = [];
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
        const curPiece = this.getPiece(possibleMove[0], possibleMove[1])
        if (curPiece.type === KING) {
          check.classList.remove("out");
          check.classList.add("check");
          isThreat = true;
          pieceThreat = piece;
          console.log(pieceThreat.player)

        }

      }
    }
    check.classList.remove("check");
    check.classList.add("out");
    return isThreat
  }

  // If the king is threat
  whosThreat() {
    for (let piece of this.pieces) {
      let possibleMoves = piece.possibleMoves();

      for (let possibleMove of possibleMoves) {
        const curPiece = this.getPiece(possibleMove[0], possibleMove[1])
        if (curPiece.type === KING) {
          check.classList.remove("out");
          check.classList.add("check");
          isThreat = true;
          pieceThreat = piece;
          console.log(pieceThreat.player)

        }

      }
    }
    check.classList.remove("check");
    check.classList.add("out");
    return pieceThreat;
  }

  // Check if i can move when the king is threat
  possibleMovesInCheck(piece) {
    let curPiece = this.whosThreat();
    let usedPiece = piece.piece;
    let possibleMoves = curPiece.possibleMoves();
    let moves = [];
    let badMoves = [];

    // create list of check moves
    for (let move of possibleMoves) {
      let row = curPiece.row;
      let col = curPiece.col;
      let kingThreat;
      curPiece.changeLocation(move[0], move[1]);

      for (let moveCurPiece of curPiece.possibleMoves()) {
        if (this.getPiece(moveCurPiece[0], moveCurPiece[1]).type === KING) {
          kingThreat = true;
        }
      }
      curPiece.changeLocation(row, col)
      if (kingThreat === true) {
        moves.push([move[0], move[1]]);
      }
    }

    console.log('sholmi', moves)
    moves.push([curPiece.row, curPiece.col]);
    let possibleMovesOponent = [];

    if (usedPiece.player === this.turn) {
      possibleMovesOponent.push(usedPiece.possibleMoves());
    }

    let checkMoves = [];
    for (let possibleMove of possibleMovesOponent) {
      for (let possible of possibleMove) {
        for (let move of moves) {
          if (possible[0] === move[0] && possible[1] === move[1]) {
            checkMoves.push([move[0], move[1]]);

          }
        }
      }
    }
    console.log('finel moves for check', checkMoves)
    return checkMoves;
  }

  // Check if i can move when the king is threat
  checkIfCanMove(piece, possibleMoves = []) {
    let curPiece = piece.piece
    let moves = possibleMoves.filter((move) => {
      let row = curPiece.row
      let col = curPiece.col
      curPiece.changeLocation(move.row, move.col)
      let kingThreat = this.isThreat()
      curPiece.changeLocation(row, col)
      if (kingThreat === false) {
        return true;
      }
      else {
        return false;
      }
    })
    if (this.isThreat() === true) {
      check.classList.remove("out");
      check.classList.add("check");
    }

    return moves
  }


}



// console.log('procecs restarted')
//       curPiece.changeLocation(row, col)
//       if (kingThreat === true) {
//         let rowUse = usedPiece.row;
//         let colUse = usedPiece.col;

//         for (let moveUsedPiece of usedPiece.possibleMoves()) {
//           if (moveUsedPiece[0] === move[0] && moveUsedPiece[1] === move[1]) {
//             usedPiece.changeLocation(moveUsedPiece[0], moveUsedPiece[1])
//           }

//           console.log('used piece curerent locaqton', usedPiece)

//           for (let movePiece of curPiece.possibleMoves()) {
//             console.log('possible move for bishop', movePiece)
//             if (this.getPiece(movePiece[0], movePiece[1]).type === KING) {
//               kingThreats = true;
//               console.log('ido', usedPiece)
//             }
//           }

//           if (kingThreats === false) {
//             moves.push([move[0], move[1]]);
//           }

//           usedPiece.changeLocation(rowUse, colUse)
//         }
//       // }