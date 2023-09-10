import { useState } from 'react'

function Increase({handleClick}) {
  console.log('Run INcrease')
  return (
    <>
      <button onClick={handleClick}> Click me </button>
    </>
  );
}


function App() {
  const [count, setCount] = useState(0)
  console.log('Run App')

  let double;
  let tripple;
  function addOneCount() {
    console.log('Add One')
    setCount(count + 1)
  }

  double = 2 * count;
  tripple = 3 * count;
  return (  
    <>
      <div>
        Hello Scratch
        <Increase handleClick={addOneCount} />
        <Increase handleClick={addOneCount} />
        <div>{count} </div>
        <div>{double} </div>
        <div>{tripple} </div>
      </div>
    </>
  )
}

export default App
