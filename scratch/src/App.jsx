import { useState } from 'react'
import './App.css'


function PointInput() {
  
  let minGridPoint = [-1.0, -1.0]
  let maxGridPoint = [2.0, 3.0]

  let gridWidth = 300
  let gridheight = 300

  let point_x = -0.4 
  let point_y = -0.2
  
  let point_top = (maxGridPoint[1] - point_y)/(maxGridPoint[1] - minGridPoint[1])*gridheight
  let point_left = (point_x - minGridPoint[0])/(maxGridPoint[0] - minGridPoint[0])*gridWidth

  let xaxis_top = (maxGridPoint[1] - 0.)/(maxGridPoint[1] - minGridPoint[1])*gridheight
  let yaxis_left = (0. - minGridPoint[0])/(maxGridPoint[0] - minGridPoint[0])*gridWidth



  let gridStyle = {
    width: gridWidth + "px",
    height: gridheight+ "px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }

  let markerStyle = {
    height: "10px",
    width: "10px",
    backgroundColor: "#aa1111",
    borderRadius: "50%",
    display: "inline-block",
    position: 'absolute',
    top: point_top-5 + "px",
    left: point_left-5 + "px"
  }

  
  let xaxisStyle = {
    height: "2px",
    width: gridWidth + "px",
    backgroundColor: "#222",
    display: "inline-block",
    position: 'absolute',
    top: xaxis_top-5 + "px",
    left: 0
  }

  let yaxisStyle = {
    height: gridheight + "px",
    width: "2px",
    backgroundColor: "#222",
    display: "inline-block",
    position: 'absolute',
    top: 0,
    left: yaxis_left-5 + "px",
  }


  return <div className="widget">
    <div className="markerbounds">
      <div className="grid" style={gridStyle}>
        <div className="marker" style={markerStyle}></div>
        <div className="axis" style={xaxisStyle}></div>
        <div className="axis" style={yaxisStyle}></div>
      </div>
    </div>
      <div>
        <p className="coord"></p>
      </div>
  </div>

}


function App() {

  const [firstName, setFirstName] = useState('')
  const firstNameId = 'firstName'

  const handleChange = (e) => {
    switch (e.target.name) {
      case firstNameId:
        setFirstName(e.target.value)
        break;
    }
  }

  return (
    <>
      <div className='App'>
        <div id='config'>
            <h1>Julia Fractals</h1>
            <hr></hr>
            <label>
              Image Height
              <input type="numeric" value={100}/>
            </label>
            <label>
              Image Width 
              <input type="numeric" value={100}/>
            </label>
            <label>
              Max Itererations 
              <input type="numeric" value={25}/>
            </label>
            <PointInput />            
        </div>
        <div id='main'>
            Hello Main
        </div>
      </div>
    </>
  )
}

export default App
