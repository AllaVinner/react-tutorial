import React, { useState } from "react";

function App() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    var a = URL.createObjectURL(e.target.files[0]);
    console.log(a)
    setFile(a);
  }

  return (
    <div className="app">
      <div className="header">
        <h1> Header </h1>
      </div>
      <div className="sidebar">
        <h2>Sidebar</h2>
        <input className="fileSelector" type="file" onChange={handleChange} />
        <div className="numRowSelector">
          <label>
            Num Rows in 
          </label>
          <input type="number" className="numRowButton" />
        </div>
      </div>
      <div className="main">
        <h2>Main</h2>

        <img src={file} />
      </div>

    </div>

  );
}

export default App;