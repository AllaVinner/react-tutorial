import { useState } from 'react';

function Square() {
    const [value, setValue] = useState(null);

    function handleClick() {
        setValue('X')
    }
    
    return (
        <button
            className="square"
            onClick={handleClick}
        >
            {value}
        </button>
    );
}

function Board() {
    return (
        <>
            <div className='board-row'>
                <Square />
                <Square />
                <Square />
            </div>
            <div className='board-row'>
                <Square />
                <Square />
                <Square />
            </div>
            <div className='board-row'>
                <Square />
                <Square />
                <Square />
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