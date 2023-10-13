import './App.css'
import React, { useState } from "react";
import Slider2d from './components/slider2D/Slider2D'
import RangeSlider2d from './components/rangeSlider2D/RangeSlider2D'

function App() {
  let [seedReal, setSeedReal] = useState(0)
  let [seedImag, setSeedImag] = useState(0)


  let [minReal, setMinReal] = useState(0)
  let [minImag, setMinImag] = useState(0)

  let [maxReal, setMaxReal] = useState(0)
  let [maxImag, setMaxImag] = useState(0)

  return (
    <div className='container'>
      <div className='header'>
        <h1>Julia Fractals With WASM</h1>
      </div>
      <nav className='config'>
        <h2> Configuration </h2>
        <hr />
        <div className='num-display'>
          <label>
            Seed:
          </label>
          <div>
            {seedReal.toFixed(2)} + {seedImag.toFixed(2)}i
          </div>
        </div>
        <Slider2d setPointX={setSeedReal} setPointY={setSeedImag} gridWidth={250} gridHeight={250} />
        <div className='num-display'>
          <label>
            Min Box Value:
          </label>
          <div>
            {minReal.toFixed(2)} + {minImag.toFixed(2)}i
          </div>
        </div>
        <div className='num-display'>
          <label>
            Max box Value:
          </label>
          <div>
            {maxReal.toFixed(2)} + {maxImag.toFixed(2)}i
          </div>
        </div>
        <RangeSlider2d setPoint1X={setMinReal} setPoint1Y={setMinImag} setPoint2X={setMaxReal} setPoint2Y={setMaxImag} gridWidth={250} gridHeight={250} />
        <div className='numeric-input'>
          <label>Image Width: </label>
          <input type='numeric' value={300}></input>
        </div>
        <div className='numeric-input'>
          <label>Max Iterations: </label>
          <input type='numeric' value={300}></input>
        </div>
      </nav>
      <main className='main'>
sdfa
      </main>
      </div>
  )
}

export default App
