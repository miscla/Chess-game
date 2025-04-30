const Board = require('./board');

describe('Chess Board', () => {
    let board;

    beforeEach(() => {
        board = new Board();
    });

    test('Initial setup has correct pawns', () => {
        for (let i = 0; i < 8; i++) {
            expect(board.board[1][i].name).toBe('P');
            expect(board.board[6][i].name).toBe('P');
        }
    });

    test('Move pawn forward', () => {
        board.movePiece([6, 0], [5, 0]);
        expect(board.board[5][0]).not.toBeNull();
        expect(board.board[6][0]).toBeNull();
    });

    test('Illegal pawn move throws error', () => {
        expect(() => {
            board.movePiece([6, 0], [4, 1]);
        }).toThrow();
    });

    test('Capture king ends game', () => {
        board.board[5][0] = board.board[7][4]; // Move white king
        board.board[7][4] = null;
        expect(board.movePiece([5, 0], [4, 0])).toBe(false);
    });

    test('Parse input correctly', () => {
        const [start, end] = Board.parseInput('b2 b3');
        expect(start).toEqual([6, 1]);
        expect(end).toEqual([5, 1]);
    });
});
