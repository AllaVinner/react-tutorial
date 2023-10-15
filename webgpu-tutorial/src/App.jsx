import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import init from './Demo'



function App() {
  const [count, setCount] = useState(0)
  init()
  return (
    <>
    <div >
    <canvas id="gpuCanvas"  width="800" height="600"></canvas>
    </div>
    
    </>
  )
}

export default App
