// function addRookW(cell){
//   const rook = document.createElement("img");
//   rook.src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/45px-Chess_rlt45.svg.png";
//   rook.className="pieces";
//   cell.appendChild(rook);
// }

// function addKnightW(cell){
//   const knight = document.createElement("img");
//   knight.src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png";
//   knight.className="pieces";
//   cell.appendChild(knight);
// }

// function addBishopW(cell){
//   const bishop = document.createElement("img");
//   bishop.src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/45px-Chess_blt45.svg.png";
//   bishop.className="pieces";
//   cell.appendChild(bishop);
// }

// function addKingW(cell){
//   const king = document.createElement("img");
//   king.src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/45px-Chess_klt45.svg.png";
//   king.className="pieces";
//   cell.appendChild(king);
// }

// function addQueenW(cell){
//   const queen = document.createElement("img");
//   queen.src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/45px-Chess_qlt45.svg.png";
//   queen.className="pieces";
//   cell.appendChild(queen);
// }

// function addPawnW(cell){
//   const pawn = document.createElement("img");
//   pawn.src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png";
//   pawn.className="pieces";
//   cell.appendChild(pawn);
// }
// // black pieces
// function addRookB(cell){
//   const rook = document.createElement("img");
//   rook.src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png";
//   rook.className="pieces";
//   cell.appendChild(rook);
// }

// function addKnightB(cell){
//   const knight = document.createElement("img");
//   knight.src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png";
//   knight.className="pieces";
//   cell.appendChild(knight);
// }

// function addBishopB(cell){
//   const bishop = document.createElement("img");
//   bishop.src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png";
//   bishop.className="pieces";
//   cell.appendChild(bishop);
// }

// function addKingB(cell){
//   const king = document.createElement("img");
//   king.src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/45px-Chess_kdt45.svg.png";
//   king.className="pieces";
//   cell.appendChild(king);
// }

// function addQueenB(cell){
//   const queen = document.createElement("img");
//   queen.src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/45px-Chess_qdt45.svg.png";
//   queen.className="pieces";
//   cell.appendChild(queen);
// }

// function addPawnB(cell){
//   const pawn = document.createElement("img");
//   pawn.src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png";
//   pawn.className="pieces";
//   cell.appendChild(pawn);
// }

const WHITE_PLAYER = 'white';
const DARK_PLAYER = 'dark'; 

let pieces =[]
class piece{
  constructor(row , col , type , player){
    this.row=row;
    this.col=col;
    this.type=type;
    this.player=player;
  }
}

function inBoard(){
  let result=[];
  result.push(new piece(0,0,"rook", DARK_PLAYER));
  return result;
}

// add images
function addImage(cell, player, type) {
  const image = document.createElement('img');
  image.src = player + "." + type + '.png';
  cell.appendChild(image);
}

function addImageByIndex(cell, player, index) {
  if (index === 0 || index === 7) {
    addImage(cell, player, 'rook');
  } else if (index === 1 || index === 6) {
    addImage(cell, player, 'knight');
  } else if (index === 2 || index === 5) {
    addImage(cell, player, 'bishop');
  } else if (index === 3) {
    addImage(cell, player, 'king');
  } else if (index === 4) {
    addImage(cell, player, 'queen');
  }
}

// select piece
let selectedCell;
function changeBackground(e){
  if (selectedCell !== undefined){
    selectedCell.classList.remove("selected")
  }
  selectedCell= e.currentTarget;
  selectedCell.classList.add("selected");
}


window.onload = () => {
  let allBoard = document.createElement("div"); 

  let chessBoard = document.createElement("table");
  chessBoard.className="chessBoard";

  for (let i=0; i<8; i++){
      let row= document.createElement("tr");
      for(let j=0; j<8; j++){
          let cell = document.createElement("td");

          if((i+j) % 2 == 0){
              cell.className="square whitesquare"
              rows.appendChild(cell);
          }
          else{
              cell.className="square blacksquare"
              row.appendChild(cell);

          }
          // if (i===7 && j===0 || i===7 && j===7){
          //   addRookW(cell)
          // } else if (i===7 && j===1 || i===7 && j===6){
          //   addKnightW(cell)
          // } else if (i===7 && j===2 || i===7 && j===5){
          //   addBishopW(cell)
          // } else if (i===7 && j===4){
          //   addKingW(cell)
          // } else if (i===7 && j===3){
          //   addQueenW(cell)
          // } else if (i===6){
          //   addPawnW(cell)
          // }

          // if (i===0 && j===0 || i===0 && j===7){
          //   addRookB(cell)
          // } else if (i===0 && j===1 || i===0 && j===6){
          //   addKnightB(cell)
          // } else if (i===0 && j===2 || i===0 && j===5){
          //   addBishopB(cell)
          // } else if (i===0 && j===4){
          //   addKingB(cell)
          // } else if (i===0 && j===3){
          //   addQueenB(cell)
          // } else if (i===1){
          //   addPawnB(cell)
          // }
         cell.addEventListener("click" , changeBackground)
      }
      
      chessBoard.appendChild(rows)
  }
  allBoard.appendChild(chessBoard);
  
  document.body.appendChild(allBoard);

  pieces = getInitialBoard();

  for (let piece of pieces) {
    addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }
}