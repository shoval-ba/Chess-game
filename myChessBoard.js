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
let deletedWhite;
let isThreat = false;

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
      if (isOccupied){
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

  isThreat(){
    for (let piece of this.pieces) {
      let possibleMoves = piece.possibleMoves();
      for(let possibleMove of possibleMoves){
        // console.log(possibleMove)
        if(this.getPiece(possibleMove[0] , possibleMove[1]).type === KING){
          check.classList.remove("out");
          check.classList.add("check");
          console.log("is threat");
          isThreat= true;
        }
      }
    }
    check.classList.remove("check");
    check.classList.add("out");
    return isThreat
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

    // const cell = table.rows[this.row].cells[this.col];
    // cell.removeChild(this.image);

    // if(this.player === WHITE_PLAYER){
      
    //   console.log("white")
    //   deletedWhite.classList.remove("out")
    //   deletedWhite.classList.add("deletedWhite") 
    //   deletedWhite.appendChild(this.image);
    // }

    // if(this.player === BLACK_PLAYER){
    //   deletedBlack.appendChild(this.image);
    //   console.log("black")
    //   deletedBlack.classList.remove("out")
    //   deletedBlack.classList.add("deletedBlack")  
    // }

    this.image.remove();
    this.deleted = true;
    this.row = -1;
    this.col = -1;
    
  }

  changePawnToQueen(){
    if(this.type===PAWN){
      if(this.player===WHITE_PLAYER && this.row===0){
        this.type===QUEEN;
      }
      if(this.player===BLACK_PLAYER && this.row===7){
        this.type===QUEEN;
      }
    }
  }

  // Where the pieces can move
  possibleMoves() {
    let filteredMoves;
    if (this.type === PAWN) {
      filteredMoves = this.pawnMoves(this.player);
    } else if (this.type === ROOK /*&& boardData.isThreat()===false*/) {
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

  isKing(){
    if(Piece.type===KING)
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
    if(isThreat === false){
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

// When you click on one piece
function onCellClick(event, row, col) {

  
  // Move the pieces
  if (pieceOld != null) {
    let newLocation = event.currentTarget;
    if (newLocation.classList.contains('possible-move')) {
      if (pieceOld.piece.player === WHITE_PLAYER) {
        turn.textContent = "black turn";
      }
      else
        turn.textContent = "white turn";

      boardData.setLocation(row, col, pieceOld.piece)
      
      boardData.isThreat()
      
      if(isThreat===false){
        console.log("no thraet")
        check.classList.remove("check")
        check.classList.add("out");
      }
      if(isThreat===true){
        console.log("yes threat")
        check.classList.remove("out");
        check.classList.add("check");
      }
      pieceOld = null;
      isThreat=false 
    }
  }

  // Delete the selected cell when you select another cell
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table.rows[i].cells[j].classList.remove('possible-move');
      table.rows[i].cells[j].classList.remove('selected');
    }
  }

  // background to the selected cell
  selectedCell = event.currentTarget;
  selectedCell.classList.add('selected');


  // Show possible moves to the white player when it`s turn

  for (let piece of boardData.pieces) {
    if (piece.row === row && piece.col === col && !piece.deleted) {
      if (piece.player === WHITE_PLAYER && boardData.turn == WHITE_PLAYER) {
        pieceOld = new state(piece, selectedCell);
        let possibleMoves = piece.possibleMoves();
        for (let possibleMove of possibleMoves)
          table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
      }
    }
  }

  // Show possible moves to the black player when it`s turn

  for (let piece of boardData.pieces) {
    if (piece.row === row && piece.col === col && !piece.deleted) {
      if (piece.player == BLACK_PLAYER && boardData.turn == BLACK_PLAYER) {
        pieceOld = new state(piece, selectedCell);
        let possibleMoves = piece.possibleMoves();
        for (let possibleMove of possibleMoves)
          table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possible-move');
      }
    }
  }
  
}


// Add the pieces
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


// Create chess board html
function createChessBoard() {
  // Create background
  background = document.createElement('div');
  document.body.appendChild(background);
  background.classList.add("background")

  deletedWhite = document.createElement('div');
  document.body.appendChild(deletedWhite);
  deletedWhite.classList.add("out")

  deletedBlack = document.createElement('div');
  document.body.appendChild(deletedBlack);
  deletedBlack.classList.add("out")

  // Create if check
  check = document.createElement('H1');
  textNodeCheck = document.createTextNode("Check");
  check.appendChild(textNodeCheck)
  background.appendChild(check);
  check.classList.add("out");

  // Create a title
  heading = document.createElement('H1');
  textNode = document.createTextNode("Chess game");
  heading.appendChild(textNode)
  background.appendChild(heading);
  heading.classList.add("h1");

  // Create white turn/black turn
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

  // Add pieces to the board
  boardData = new BoardData(piecesOnBoard());
  
}

// Call the function who crate the board
window.addEventListener('load', createChessBoard);