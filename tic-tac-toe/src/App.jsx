import { useState } from 'react';

function Square({ value, onSquareClick}) {
    
    return (
        <button
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({player, squares, onPlay}) {

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const squares_copy = squares.slice();
        if (player === 'X') {
            squares_copy[i] = 'X';
        } else if (player === 'O') {
            squares_copy[i] = 'O';
        }
        onPlay(squares_copy)
    }


    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next Player: " + player;
    }
 
    return (
        <>
            <div className='status'>{status}</div>
            <div className='board-row'>
                <Square value={squares[0]} onSquareClick={() => handleClick(0, player)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1, player)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2, player)} />
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquareClick={() => handleClick(3, player)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4, player)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5, player)} />
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquareClick={() => handleClick(6, player)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7, player)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8, player)} />
            </div>
        </>
    );
}


function Game() {

    const [player, setPlayer] = useState('X');
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        let nextPlayer;
        switch (player) {
            case 'X':
                nextPlayer = 'O';
                break;
            case 'O':
                nextPlayer = 'X';
                break;
            default:
                nextPlayer = 'X';
        }
        setPlayer(nextPlayer);
    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        let nextPlayer;
        switch (nextMove % 2) {
            case 0:
                nextPlayer = 'X';
                break;
            case 1:
                nextPlayer = 'O';
                break;
            default:
                nextPlayer = 'X';
        }
        setPlayer(nextPlayer);
    }   

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });



    return (
        <div className='game'>
            <div className="game-board">
                <Board player={player} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className='game-info'> 
                <ol>
                    {moves}
                </ol>
            </div>    
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


export default Game