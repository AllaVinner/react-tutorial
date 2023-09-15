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


function Matrix({array}) {
  return (
    <>
      <Row array={array} />
      <Row array={array} />
    </>
  )
}

function App() {
  const [val, setVal] = useState(0)
  console.log('Run App')
  const [arr, setArr] = useState( Array(7).fill(0).map((v, i) => i))

  const handleSubmit = (e) => {
    console.log('Handle submit')
    const num = parseInt(e.target.value)
    if (num) {
      setArr(Array(parseInt(e.target.value)).fill(0).map((v, i) => i))
    }
    setVal(e.target.value)
  }


  return (  
    <>
      <div>
        Hello Scratch
        <input type="number" onChange={(e) => handleSubmit(e)}/>
        <div> Number {val} </div>
        <Matrix array={arr} />
      </div>
    </>
  )
}

export default App
