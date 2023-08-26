import { useState } from 'react'
import './styles.css'

function Box() {
  return (
    <button className='box'>X</button>
  );
}

function Row({ncol}) {
  const row = Array(ncol).fill(<Box />);
  return (
    <>
      <div className='board-row'>
        {row}
      </div>
    </>
  );

}


function Grid({ ncol, nrow }) {
  const grid = Array(nrow).fill(null).map((v, i) => {
    return (
      <>
        <Row ncol={ncol} />
      </>
    );
  });
  return (<>
    {grid}
  </>
  );
}

function App() {
  return (
    <>
      <div> Hello Tic</div>
      <Grid ncol={4} nrow={5}/>
    </>
  );
}

export default App
