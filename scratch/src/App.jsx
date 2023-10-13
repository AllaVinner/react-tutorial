import React, { useState } from "react";
import "./App.css"
import PointPicker from "./pointPicker/pointPicker";
import BoxPicker from "./boxPicker/boxPicker";


function App() {
  let [pointX, setPointX] = useState(0.3)
  let [pointY, setPointY] = useState(0.3)

  let [minPointX, setMinPointX] = useState(0.3)
  let [minPointY, setMinPointY] = useState(0.3)

  let [maxPointX, setMaxPointX] = useState(0.3)
  let [maxPointY, setMaxPointY] = useState(0.3)

  return (
    <div className="app">
      <div> Hello</div>
      <div className="board">
        <div>Hello</div>
        <BoxPicker pointHeight={10} pointWidth={10} />
        <PointPicker />
        <div>Hello</div>
        <div>Hello</div>
        <div className="axis">Hello</div>
        <PointPicker />
        <div>{pointX}</div>
      </div>
    </div>
  );
}

export default App;