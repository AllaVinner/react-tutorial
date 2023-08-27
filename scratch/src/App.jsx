import { useState } from 'react'

function Increase({handleClick}) {
  return (
    <>
      <button onClick={handleClick}> Click me </button>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0)

  function addOneCount() {
    setCount(count + 1)
  }

  return (  
    <>
      <div>
        Hello Scratch
        <Increase handleClick={addOneCount} />
        <div>{count} </div>
      </div>
    </>
  )
}

export default App
