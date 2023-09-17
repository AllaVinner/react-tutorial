import { useState } from 'react'


function Square({ value, onSquareClick }) {
  
  const default_value = ' '

  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value ? value: default_value}
    </button>
  );
}

function Row({rowNumber, array, setCellValue}) {

  return <ul key={'rowcontainer' + rowNumber} className="row">
    {array.map((v, i) => <Square key={'row-'+rowNumber+'col-'+i} value={v} onSquareClick={(e) => setCellValue(i)} />) }
  </ul>
}


function Matrix({ array, setCellValue}) {
  
  return (
    <>
      {array.map((v, i) => <Row key={'row-number-' + i} rowNumber={i} array={v} setCellValue={(col, val) => setCellValue(i, col)} />)}
    </>
  )
}

function App() {
  const [numRow, setRow] = useState(3)
  const [numCol, setCol] = useState(3)
  const [numToWin, setNumToWin] = useState(3)
  const [moveNum, setMoveNum] = useState(0)
  const [winningPlayer, setWinningPlayer] = useState(null)

  const players = ['X', 'O']

  console.log('Run App')
  const [arr, setArr] = useState(Array(numRow).fill(null).map((v) => Array(numCol).fill(null)))

  const resetBoard = () => {
    setArr(Array(numRow).fill(null).map((v) => Array(numCol).fill(null)))
    setWinningPlayer(null)
  }
  
  const handleRowSubmit = (e) => {
    const num = parseInt(e.target.value)
    if (num) {
      setArr(Array(num).fill(null).map((v) => Array(numCol).fill(null)))
      setRow(num)
    }
  }

  const handleColSubmit = (e) => {
    const num = parseInt(e.target.value)
    if (num) {
      setArr(Array(numRow).fill(null).map((v) => Array(num).fill(null)))
      setCol(num)
    }
  }

  const handleNumToWinSubmit = (e) => {
    const num = parseInt(e.target.value)
    if (num) {
      setNumToWin(num)
    }
  }

  const setCellValue = (row, col) => {
    if (arr[row][col] != null) {
      return
    }
    var tmp = arr.slice()
    tmp[row][col] = players[moveNum % players.length]
    if (isWinning(row, col, numToWin, tmp)) {
      setWinningPlayer(tmp[row][col])
    }
    setArr(tmp)
    setMoveNum(moveNum + 1)
  }

  return (  
    <>
      <div className='container'>
        <div className='header'>
          <h1>Tic Toe Tac</h1>
        </div>
        <div className='sidebar'>
          <h3 className='config-label'></h3>
          <button onClick={() => resetBoard()} >Reset</button>
          <h3 className='config-label'>Number of Rows: </h3>
          <input type="number" onChange={(e) => handleRowSubmit(e)} value={numRow} />
          <h3 className='config-label'>Number of Columns: </h3>
          <input type="number" onChange={(e) => handleColSubmit(e)} value={numCol} />
          <h3 className='config-label'>Number to Win: </h3>
          <input type="number" onChange={(e) => handleNumToWinSubmit(e)} value={numToWin} />
      </div>
      <div className='board'>
        <Matrix array={arr} setCellValue={setCellValue} />
        </div>
        {winningPlayer &&
          <h2 className='winnning-header'>Player {winningPlayer} Won!</h2>
        }
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
