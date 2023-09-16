import { useState } from 'react'


function Square({ value, onSquareClick }) {

  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Row({array}) {

  return <ul>
    {array.map((v) => <Square value={v} onSquareClick={(e) => (1)} />) }
  </ul>
}


function Matrix({ array }) {
  
  return (
    <>
      {array.map((v) => <Row array={v} />)}
    </>
  )
}

function App() {
  const [numRow, setRow] = useState(0)
  const [numCol, setCol] = useState(0)
  console.log('Run App')
  const [arr, setArr] = useState( Array(3).fill(Array(7).fill('x')))

  const handleRowSubmit = (e) => {
    console.log('Handle submit')
    const num = parseInt(e.target.value)
    if (num) {
      setArr(Array(num).fill(Array(numCol).fill('x')))
    }
    setRow(num)
  }

  const handleColSubmit = (e) => {
    console.log('Handle Col submit')
    const num = parseInt(e.target.value)
    if (num) {
      setArr(Array(numRow).fill(Array(num).fill('x')))
    }
    setCol(num)
  }


  return (  
    <>
      <div>
        Hello Scratch
        <input type="number" onChange={(e) => handleRowSubmit(e)} />
        <input type="number" onChange={(e) => handleColSubmit(e)} />
        <div> Number {numCol} </div>
        <Matrix array={arr} />
      </div>
    </>
  )
}

export default App
