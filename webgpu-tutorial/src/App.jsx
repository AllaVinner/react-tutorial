import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import init from './Demo'
import RangeSlider2D from './RangeSlider2D'
import Slider2D from './Slider2D'



function App() {
  const [zx, setZX] = useState(-1.)
  const [zy, setZY] = useState(0.2)

  const [minReal, setMinReal] = useState(-1.4)
  const [minImag, setMinImag] = useState(-1.2)

  const [maxReal, setMaxReal] = useState(1.4)
  const [maxImag, setMaxImag] = useState(1.2)

  
  let numHeight = 1200;
  let numWidth = 1400;
  let vertices = new Float32Array(numHeight*numWidth*4)

  const struct_length = 8
  function update_vertives() {
    for (let i = 0; i < numHeight; i++) {
      for (let j = 0; j < numWidth; j++){
          vertices[struct_length*(j+numWidth*i)+0] = j/numWidth*(maxReal-minReal)+minReal;
          vertices[struct_length*(j+numWidth*i)+1] = i/numHeight*(maxImag-minImag)+minImag;
          vertices[struct_length*(j+numWidth*i)+2] = zx;
          vertices[struct_length*(j+numWidth*i)+3] = zy;
        } 
  }

  }

  useEffect(() => {
    update_vertives()
    init(vertices);
  }, [zx, zy, minReal, minImag, maxReal, maxImag])
  return (
    <>
    <div >
    <Slider2D 
      setPointX={setZX}
      setPointY={setZY}
      initialX={zx}
      initialY={zy}
    />
    <RangeSlider2D setPoint1X={setMinReal} setPoint1Y={setMinImag} setPoint2X={setMaxReal} setPoint2Y={setMaxImag} />
    <canvas id="gpuCanvas"  width="1200" height="900"></canvas>
    </div>
    
    </>
  )
}

export default App
