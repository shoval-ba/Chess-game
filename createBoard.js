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
let pieceNew;
let filteredMoves;
let canMove;


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

  // White player
  whitePlayer = document.createElement('div');
  textNodeWhite = document.createTextNode("White player");
  whitePlayer.appendChild(textNodeWhite)
  background.appendChild(whitePlayer);
  whitePlayer.classList.add("whitePlayer")

  // White eat
  deletedWhite = document.createElement('div');
  whitePlayer.appendChild(deletedWhite);
  deletedWhite.classList.add("deletedWhite")

  // Black player
  blackPlayer = document.createElement('div');
  textNodeBlack = document.createTextNode("Black player");
  blackPlayer.appendChild(textNodeBlack)
  background.appendChild(blackPlayer);
  blackPlayer.classList.add("blackPlayer")

  // Black eat
  deletedBlack = document.createElement('div');
  blackPlayer.appendChild(deletedBlack);
  deletedBlack.classList.add("deletedBlack")

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
  background.appendChild(table);
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

      // Create if check
      check = document.createElement('H1');
      textNodeCheck = document.createTextNode("Check");
      check.appendChild(textNodeCheck)
      table.appendChild(check);
      check.classList.add("out");

    }
  }

  // Add pieces to the board
  boardData = new BoardData(piecesOnBoard());

}

// Call the function who crate the board
window.addEventListener('load', createChessBoard);