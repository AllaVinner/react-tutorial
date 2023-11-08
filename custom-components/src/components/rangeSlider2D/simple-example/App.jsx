import React, { useState } from "react";
import RangeSlider2D from "../RangeSlider2D";
import './styles.css'


function App() {
    let [minX, setMinX] = useState(0)
    let [minY, setMinY] = useState(0)
    let [maxX, setMaxX] = useState(0.5)
    let [maxY, setMaxY] = useState(0.5)

    return (
        <div id="minimal-example-range-slider-2d">
            <RangeSlider2D
                point1X={minX} setPoint1X={setMinX}
                point1Y={minY} setPoint1Y={setMinY}
                point2X={maxX} setPoint2X={setMaxX}
                point2Y={maxY} setPoint2Y={setMaxY}
            />
        </div>
    )
}

export default App
