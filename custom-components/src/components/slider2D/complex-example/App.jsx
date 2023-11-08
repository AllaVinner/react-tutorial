import React, { useState } from "react";
import Slider2D from "../Slider2D";
import './styles.css'


function App() {
    let [x, setX] = useState(0)
    let [y, setY] = useState(0)

    return (
        <div id="complex-example-range-slider-2d">
            <h2> Complex Slider2D</h2>
            <div className="coordinate-container">
                <div>x: {x.toFixed(2)}</div>
                <div>y: {y.toFixed(2)}</div>
            </div>
            <Slider2D
                pointX={x}
                pointY={y}
                setPointX={setX}
                setPointY={setY}
            />
        </div>
    )
}

export default App
