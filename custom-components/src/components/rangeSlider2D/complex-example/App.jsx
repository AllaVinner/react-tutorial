import React, { useState } from "react";
import RangeSlider2D from "../RangeSlider2D";
import './styles.css'


function App() {
    let [minX, setMinX] = useState(0)
    let [minY, setMinY] = useState(0)
    let [maxX, setMaxX] = useState(0.5)
    let [maxY, setMaxY] = useState(0.5)

    return (
        <div id="complex-example-range-slider-2d">
            <h2> Complex RangeSlider2D</h2>
            <div className="coordinate-container">
                <div>x: {minX.toFixed(2)}</div>
                <div>y: {minY.toFixed(2)}</div>
                <div>x: {maxX.toFixed(2)}</div>
                <div>y: {maxY.toFixed(2)}</div>
            </div>
            <RangeSlider2D
                point1X={minX}
                point1Y={minY}
                point2X={maxX}
                point2Y={maxY}
                setPoint1X={setMinX}
                setPoint1Y={setMinY}
                setPoint2X={setMaxX}
                setPoint2Y={setMaxY}
            />
        </div>
    )
}

export default App
