import { useState } from 'react'
import './styles.css'

function Box({value, handleClick}) {

  return (
    <button className='box' onClick={handleClick}>{value}</button>
  );
}

function Board({ ncol, nrow, round, nextRound, players}) {
  let grid = Array(nrow).fill().map(_ => Array(ncol).fill(null));x  

  function handleClick(rowi, coli) {
    console.log('in board handle click', rowi, coli, round);
    grid[rowi][coli] = round % players.length;
    nextRound();
    
  }

  let gridUi = grid.map((row, ri) => {
    return (
      <div className='board-row'>
        {
          row.map((val, ci) => {
            return <Box value={val} handleClick={() => handleClick(ri, ci)}/>;
          })
        }
      </div>
    );
  });



  return (
    <>
      {gridUi}
    </>
  );
}

function BoardConfig({setNCol, setNRow}) {

  function handleInput(e) {
    console.log('INPTUTTT');
    console.log(e.target.value);
    setNRow(e.target.value)
  }
  return (
    <>
      <input type='number' onInput={e => setNRow(e.target.value * 1)}/>
      <input type='number' onInput={e => setNCol(e.target.value*1)} />
    </>
  );
}

function App() {
  const [ncol, setNCol] = useState(5);
  const [nrow, setNRow] = useState(4);
  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState(['X', 'Y']);

  function nextRound() {
    setRound(round + 1);
  }

  return (
    <>
      <BoardConfig setNRow={setNRow} setNCol={setNCol} />
      <div>Num Row {nrow}</div>
      <div>Num Column {ncol}</div>
      <div> Hello Tic</div>
      <Board ncol={ncol} nrow={nrow} round={round} nextRound={nextRound} players={players} />
    </>
  );
}

export default App
