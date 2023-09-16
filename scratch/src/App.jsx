import { useState } from 'react'


function Square({ value, onSquareClick }) {
  
  const default_value = ' '

  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ height: "20px" }}
    >
      {value ? value: default_value}
    </button>
  );
}

function Row({array, setCellValue}) {

  return <ul style={{height: "20px", margin: "0px"}}>
    {array.map((v, i) => <Square value={v} onSquareClick={(e) => setCellValue(i)} />) }
  </ul>
}


function Matrix({ array, setCellValue}) {
  
  return (
    <>
      {array.map((v, i) => <Row array={v} setCellValue={(col, val) => setCellValue(i, col)} />)}
    </>
  )
}

function App() {
  const [numRow, setRow] = useState(0)
  const [numCol, setCol] = useState(0)
  const [moveNum, setMoveNum] = useState(0)

  const players = ['X', 'O']

  console.log('Run App')
  const [arr, setArr] = useState( Array(3).fill(null).map((v) => Array(7).fill(null)))

  const handleRowSubmit = (e) => {
    const num = parseInt(e.target.value)
    if (num) {
      setArr(Array(numCol).fill(null).map((v) => Array(num).fill(null)))
    }
    setRow(num)
  }


  const handleColSubmit = (e) => {
    const num = parseInt(e.target.value)
    if (num) {
      setArr(Array(num).fill(null).map((v) => Array(numRow).fill(null)))
    }
    setCol(num)
  }


  const setCellValue = (row, col) => {
    if (arr[row][col] != null) {
      return
    }
    var tmp = arr.slice()
    tmp[row][col] = players[moveNum % players.length]
    if (isWinning(row, col, 3, tmp)) {
      console.log('WINNING MOVE')
    }
    setArr(tmp)
    setMoveNum(moveNum + 1)
  }

  return (  
    <>
      <div>
        Hello Scratch
        <input type="number" onChange={(e) => handleRowSubmit(e)} />
        <input type="number" onChange={(e) => handleColSubmit(e)} />
        <button onClick={() => console.log(arr)} />
        <div> Number {numCol} </div>
        <Matrix array={arr} setCellValue={setCellValue} />
      </div>
    </>
  )
}


function addVec(a, b) {
  let sum = []
  for (let i = 0; i < a.length; i++) {
    sum.push(a[i] + b[i])
  }
  return sum
}


function negVec(a) {
  let neg = []
  for (let i = 0; i < a.length; i++) {
    neg.push(-a[i])
  }
  return neg
}

function isWinning(row, col, numToWinn, board) {
  const player = board[row][col]
  let numConnected = 1
  let cursor = [row, col]
  for (let direction of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
    numConnected = 1
    cursor = [row, col]
    for (let i = 1; i < numToWinn; i++) {
      cursor = addVec(cursor, direction)
      if (!isInside(cursor[0], cursor[1], board.length, board[0].length)) {
        break;
      }
      if (board[cursor[0]][cursor[1]] === player) {
        numConnected += 1
      } else {
        break;
      }
    }

    cursor = [row, col]
    direction = negVec(direction)
    for (let i = 1; i < numToWinn; i++) {
      cursor = addVec(cursor, direction)
      if (!isInside(cursor[0], cursor[1], board.length, board[0].length)) {
        break;
      }
      if (board[cursor[0]][cursor[1]] === player) {
        numConnected += 1
      } else {
        break;
      }
    }
    if (numConnected >= numToWinn) {
      return true
    }
  }

  return false  
}

function isInside(row, col, maxRow, maxCol) {
  if (row < 0 || col < 0) {
    return false;
  }
  if (row >= maxRow || col >= maxCol) {
    return false;
  }
  return true;
}


export default App
