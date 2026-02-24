const game = (() => {
    const board = [['','',''],['','',''],['','','']];
    let numTurns = 0;
    let playerOneTurn = true;
    let gameOver = false;
    
    const makeMove = (r, c) => {
        if(board[r][c] !== '' || gameOver) return;
        if(playerOneTurn) board[r][c] = 'x';
        else board[r][c] = 'o';
        playerOneTurn = !playerOneTurn;
        numTurns++;
    };

    const boardStatus = () => {
        gameOver = true;
        // Check columns
        for(let c=0; c<3; c++) {
            let oCount = 0, xCount = 0;
            for(let r=0; r<3; r++) {
                if(board[r][c] === 'x') xCount++;
                else if(board[r][c] === 'o') oCount++;
            }
            if(xCount === 3) return 'p1';
            else if(oCount === 3) return 'p2';
        }
        // Check rows
        for(let r=0;  r<3; r++) {
            let oCount = 0, xCount = 0;
            for(let c=0; c<3; c++) {
                if(board[r][c] === 'x') xCount++;
                else if(board[r][c] === 'o') oCount++;
            }
            if(xCount === 3) return 'p1';
            else if(oCount === 3) return 'p2';
        }
        // Check diagonals
        if(board[0][0] === 'x' && board[1][1] === 'x' && board[2][2] === 'x') return 'p1';
        if(board[0][0] === 'o' && board[1][1] === 'o' && board[2][2] === 'o') return 'p2';
        if(board[2][0] === 'x' && board[1][1] === 'x' && board[0][2] === 'x') return 'p1';
        if(board[2][0] === 'o' && board[1][1] === 'o' && board[0][2] === 'o') return 'p2';
        // If no three in a row
        if(numTurns === 9) return 'draw';
        // Game is still going on
        gameOver = false;
        return 'continue';
    };

    return { makeMove, boardStatus }
})();