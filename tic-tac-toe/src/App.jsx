import { useState } from 'react';

function Square() {
    return <button className="square">X</button>;
}

function Game() {
    return (
        <div className="game">
            {Square()}
        </div>
    );
}

export default Game