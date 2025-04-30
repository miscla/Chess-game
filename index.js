const readline = require('readline');
const Board = require('./board');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const board = new Board();
let currentTurn = 'W'; // White starts
let gameOver = false;

function promptMove() {
    if (gameOver) {
        rl.close();
        return;
    }

    board.printBoard();
    console.log(`${currentTurn === 'W' ? "White" : "Black"}'s move:`);

    rl.question("Enter move (e.g., 'b2 b3' or '1,3 2,3'): ", (input) => {
        try {
            const [start, end] = Board.parseInput(input);
            const piece = board.board[start[0]][start[1]];

            if (!piece) {
                console.log("No piece at the selected start position.");
                return promptMove();
            }
            if (piece.color !== currentTurn) {
                console.log(`It's ${currentTurn}'s turn.`);
                return promptMove();
            }

            const capturedKing = board.movePiece(start, end);

            if (capturedKing) {
                console.log(`${currentTurn === 'W' ? "White" : "Black"} wins! King captured!`);
                gameOver = true;
                rl.close();
            } else {
                currentTurn = currentTurn === 'W' ? 'B' : 'W';
                promptMove();
            }
        } catch (err) {
            console.log(`Error: ${err.message}`);
            promptMove();
        }
    });
}

promptMove();
