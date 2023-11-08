import './App.css'
import React, { useState } from "react";
//import ExampleApp from './components/rangeSlider2D/complex-example/App'
//import ExampleApp from './components/rangeSlider2D/simple-example/App'
//import ExampleApp from './components/slider2D/complex-example/App'
//import ExampleApp from './components/slider2D/simple-example/App'
import ExampleApp from './components/switchList/simple-example/App'

//import RangeSlider2d from './components/rangeSlider2D/RangeSlider2D'

function App() {
  
  return (
<<<<<<< HEAD
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
        <Slider2d setPointX={setSeedReal} setPointY={setSeedImag} gridWidth={200} gridHeight={200} />
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
        <RangeSlider2d setPoint1X={setMinReal} setPoint1Y={setMinImag} setPoint2X={setMaxReal} setPoint2Y={setMaxImag} gridWidth={200} gridHeight={200} />
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
=======
    <div>
      <ExampleApp/>  
    </div>
>>>>>>> 96c766c64e4c4ed0acfb444199cf82339ff29975
  )
}

export default App
