var redPlayer = "R";
var yellowPlayer = "Y";
var currPlayer = "R";
var gameOver = false;
var board;
var currColumns;
var rows = 6;
var columns = 7;


window.onload = function() {
	createGame();
}

function createGame(){
	board = [];
	currColumns = [5, 5, 5, 5, 5, 5, 5];
	for(let r=0; r < rows; r++){
		let row = [];
		for(let c=0; c < columns; c++){
			row.push(' '); //js to push string


			let tile = document.createElement("div");
			tile.id = r.toString() + "-" + c.toString();// gives each slot on board an id
			tile.classList.add("tile");// class for all of the tiles on the board
			tile.addEventListener("click", setPiece);
			document.getElementById("board").append(tile);
		}
		board.push(row);
	}

}

function setPiece(){
	if(gameOver){
		return;
	}
	let coords = this.id.split("-"); //split id to get row and column. 
	let r = parseInt(coords[0]);
	let c = parseInt(coords[1]);

	r = currColumns[c];

	if(r < 0){
		return;
	}

	board[r][c] = currPlayer;
	let tile = document.getElementById(r.toString() + "-" + c.toString());
	if(currPlayer == redPlayer){
		tile.classList.add("red-piece");
		currPlayer = yellowPlayer;
	}
	else{
		tile.classList.add("yellow-piece");
		currPlayer = redPlayer;
	}
	r-=1; // updates the row height for each column
	currColumns[c] = r; //  update our row array for given column;

	checkforWinner();
}

function checkforWinner(){
	for(let r = 0; r < rows; r++){ //checks horizontally
		for(let c = 0; c < columns-3; c++){
			if(board[r][c] != ' '){
				if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
					setWinner(r,c);
					return;

				}
			}

		}
	}
	for(let c = 0; c < columns; c++){ //checks vertically
		for(let r = 0; r < rows-3; r++){
			if(board[r][c] != ' '){
				if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
					setWinner(r,c);
					return;

				}
			}

		}
	}
	for(let r = 0; r < rows -3; r++){ //checks opposite of diagonal
		for(let c = 0; c < columns-3; c++){
			if(board[r][c] != ' '){
				if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
					setWinner(r,c);
					return;

				}
			}
		}
	}
	for(let r = 3; r < rows ; r++){ //checks diagonally
		for(let c = 0; c < columns -3; c++){
			if(board[r][c] != ' '){
				if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
					setWinner(r,c);
					return;

				}
			}
		}
	}

	
}

function setWinner(r,c){
	let winner = document.getElementById("winner");
	if(board[r][c] == redPlayer){
		winner.innerText = "Red WINS!";
	}
	else{
		winner.innerText = "Yellow WINS!";
	}


	const refreshBtn = document.getElementById("Refresh");
	function handleClick() {
  		window.location.reload();
	}

	refreshBtn.addEventListener("click", handleClick);	

	gameOver = true;
}

