import React, { useState } from "react";
import Slider2D from "../Slider2D";
import './styles.css'


function App() {
    let [x, setX] = useState(0)
    let [y, setY] = useState(0)
    return (
        <div id="minimal-example-slider-2d">
            <Slider2D
                pointX={x} setPointX={setX}
                pointY={y} setPointY={setY}
            />
        </div>
    )
}

export default App
