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

function Board() {
    const [player, setPlayer] = useState('X');
    const [squares, setSquares] = useState(Array(9).fill(null));


    function handleClick(i, player) {
        if (squares[i]) {
            return;
        }
        const squares_copy = squares.slice();
        if (player === 'X') {
            squares_copy[i] = 'X';
            setPlayer('O')
        } else if (player === 'O') {
            squares_copy[i] = 'O';
            setPlayer('X')
        }
        setSquares(squares_copy);
    }
 
    return (
        <>
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
    return (
        <div className="game">
            <Board />
        </div>
    );
}

export default Game