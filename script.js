const game = (() => {
    const board = [['','',''],['','',''],['','','']];
    let numTurns = 0;
    let playerOneTurn = true;
    let gameOver = false;
    
    const makeMove = (r, c) => {
        if(board[r][c] !== '' || gameOver) return;
        if(playerOneTurn) {
            board[r][c] = 'x';
            document.getElementById(r+'-'+c).textContent = 'x';
        }
        else {
            board[r][c] = 'o';
            document.getElementById(r+'-'+c).textContent = 'o';
        }
        playerOneTurn = !playerOneTurn;
        numTurns++;
        displayMessage();
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

    const displayMessage = () => {
        const msgBox = document.getElementById("message");
        const res = boardStatus();
        if(res === 'p1') msgBox.textContent = "Player one wins!";
        else if(res === 'p2') msgBox.textContent = "Player two wins!";
        else if(res === "draw") msgBox.textContent = "Draw!";
        else if(playerOneTurn) msgBox.textContent = "Player one's turn";
        else if(!playerOneTurn) msgBox.textContent = "Player two's turn";
    }

    const hoverTest = (id) => {
        const pair = id.split('-');
        return board[+pair[0]][+pair[1]] === '' && !gameOver;
    }

    return { makeMove, boardStatus, displayMessage, hoverTest }
})();

let boxes = document.getElementById('board').childNodes;
for(let i=0; i<boxes.length; i++) {
    boxes[i].addEventListener('mouseover', (e) => {
        if(game.hoverTest(boxes[i].id)) {
            boxes[i].style.backgroundColor = "rgb(209,227,255)";
        }
    });
    boxes[i].addEventListener('mouseout', (e) => {
        boxes[i].style.backgroundColor = "white";
    });
    boxes[i].addEventListener('click', (e) => {
        boxes[i].style.backgroundColor = "white";
    })
}

game.displayMessage();
