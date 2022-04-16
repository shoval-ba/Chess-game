window.onload = () => {
    let allBoard = document.createElement("div");

    let chessBoard = document.createElement("table");
    chessBoard.className="chessBoard";

    for (let i=0; i<8; i++){
        let columns = document.createElement("tr");

        for(let j=0; j<8; j++){
            let rows = document.createElement("td");

            if((i+j) % 2 == 0){
                rows.className="square whitesquare"
                columns.appendChild(rows);
            }
            else{
                rows.className="square blacksquare"
                columns.appendChild(rows);
            }
        }
        chessBoard.appendChild(columns)
    }
    allBoard.appendChild(chessBoard);
    
    document.body.appendChild(allBoard);
}