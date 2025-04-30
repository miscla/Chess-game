const Piece = require('./piece');

class Board {
    constructor() {
        this.board = this.createInitialBoard();
    }

    createInitialBoard() {
        const board = Array.from({ length: 8 }, () => Array(8).fill(null));

        for (let i = 0; i < 8; i++) {
            board[1][i] = new Piece('P', 'B'); // Black pawns
            board[6][i] = new Piece('P', 'W'); // White pawns
        }

        const pieceOrder = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
        for (let i = 0; i < 8; i++) {
            board[0][i] = new Piece(pieceOrder[i], 'B');
            board[7][i] = new Piece(pieceOrder[i], 'W');
        }

        return board;
    }

    printBoard() {
        console.log('  a  b  c  d  e  f  g  h');
        for (let row = 0; row < 8; row++) {
            let rowStr = `${8 - row} `;
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                rowStr += piece ? piece.toString() + " " : "__ ";
            }
            console.log(rowStr + `${8 - row}`);
        }
        console.log('  a  b  c  d  e  f  g  h');
    }

    movePiece(start, end) {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;
        const piece = this.board[startRow][startCol];

        if (!piece) {
            throw new Error("No piece at the starting position.");
        }

        if (!this.isLegalMove(piece, start, end)) {
            throw new Error("Illegal move for this piece.");
        }

        const target = this.board[endRow][endCol];
        if (target && target.color === piece.color) {
            throw new Error("Cannot capture your own piece.");
        }

        this.board[endRow][endCol] = piece;
        this.board[startRow][startCol] = null;

        if (target && target.name === 'K') {
            return true; // King captured
        }
        return false;
    }

    isLegalMove(piece, start, end) {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;
        const rowDiff = endRow - startRow;
        const colDiff = endCol - startCol;

        if (piece.name === 'P') {
            const direction = piece.color === 'W' ? -1 : 1;
            if (colDiff === 0 && rowDiff === direction && this.board[endRow][endCol] === null) {
                return true;
            }
            if (colDiff === 0 && rowDiff === 2 * direction && (startRow === 6 || startRow === 1) && this.board[endRow][endCol] === null) {
                return true;
            }
            if (Math.abs(colDiff) === 1 && rowDiff === direction && this.board[endRow][endCol] !== null) {
                return true;
            }
            return false;
        }

        if (piece.name === 'K') {
            return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
        }

        if (piece.name === 'Q') {
            return Math.abs(rowDiff) === Math.abs(colDiff) || rowDiff === 0 || colDiff === 0;
        }

        if (piece.name === 'R') {
            return rowDiff === 0 || colDiff === 0;
        }

        if (piece.name === 'B') {
            return Math.abs(rowDiff) === Math.abs(colDiff);
        }

        if (piece.name === 'N') {
            return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
                   (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
        }

        return false;
    }

    static parseInput(inputStr) {
        try {
            const parts = inputStr.trim().split(' ');
            if (parts[0].includes(',')) {
                const [startStr, endStr] = parts;
                const start = startStr.split(',').map(Number);
                const end = endStr.split(',').map(Number);
                return [start, end];
            } else {
                const [startStr, endStr] = parts;
                const start = [8 - parseInt(startStr[1]), startStr.charCodeAt(0) - 'a'.charCodeAt(0)];
                const end = [8 - parseInt(endStr[1]), endStr.charCodeAt(0) - 'a'.charCodeAt(0)];
                return [start, end];
            }
        } catch (err) {
            throw new Error("Invalid input format. Example: '1,3 2,3' or 'b2 b3'.");
        }
    }
}

module.exports = Board;
