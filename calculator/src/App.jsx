import { useState } from 'react'


function Button({symbol, onClick, className}) {
  return <button className={className} onClick={onClick}>{symbol}</button>
}

function App() {
  const [symbols, setSymbols] = useState([])


  function addSymbol(s) {
    let next_symboles = symbols.slice();
    next_symboles.push(s);
    setSymbols(next_symboles);
  }

  function evaluate() {
    console.log(symbols)
    let next_syms = evaluate_buffer(symbols.slice())
    console.log(next_syms)
    setSymbols([next_syms])
  }

  return (
    <>
      <div id="calculator">
        <div id="keyboard">
          <h1 id={'display'}>{symbols}</h1>
          <Button className={'button'} symbol={'^'} onClick={() => addSymbol('^')}/>
          <Button className={'button'} symbol={'('} onClick={() => addSymbol('(')}/>
          <Button className={'button'} symbol={')'} onClick={() => addSymbol(')')}/>
          <Button className={'button'} symbol={'+'} onClick={() => addSymbol('+')}/>
          <Button className={'button'} symbol={7} onClick={() => addSymbol(7)}/>
          <Button className={'button'} symbol={8} onClick={() => addSymbol(8)}/>
          <Button className={'button'} symbol={9} onClick={() => addSymbol(9)}/>
          <Button className={'button'} symbol={'-'} onClick={() => addSymbol('-')}/>
          <Button className={'button'} symbol={6} onClick={() => addSymbol(6)}/>
          <Button className={'button'} symbol={5} onClick={() => addSymbol(5)}/>
          <Button className={'button'} symbol={4} onClick={() => addSymbol(4)}/>
          <Button className={'button'} symbol={'*'} onClick={() => addSymbol('*')}/>
          <Button className={'button'} symbol={3} onClick={() => addSymbol(3)}/>
          <Button className={'button'} symbol={2} onClick={() => addSymbol(2)}/>
          <Button className={'button'} symbol={1} onClick={() => addSymbol(1)}/>
          <Button className={'button'} symbol={'/'} onClick={() => addSymbol('/')}/>
          <Button className={'button'} symbol={0} onClick={() => addSymbol(0)}/>
          <Button className={'button'} symbol={'.'} onClick={() => addSymbol('.')}/>
          <Button className={'button'} symbol={"\u21A9"} onClick={() => setSymbols([])}/>
          <Button className={'button'} symbol={"="} onClick={() => evaluate()}/>
          <Button className={'wide-button'} symbol={"Press"} onClick={() => console.log(symbols)}/>
        </div>
      </div>
    </>
  )
}

function evaluate_buffer(buffer) {
  let parenthesis = []
  let value = null;
  let next_buffer = []
  // Create nums
  for (let s of buffer) {
    if (typeof(s) === 'number') {
      if (value === null) {
        value = 0;
      }
      value = value*10 + s;
    } else {
      if (!(value === null)) {
        next_buffer.push(value)
      }
      next_buffer.push(s)
      value = null
    }
  }
  if (!(value===null)) {
    next_buffer.push(value)
  }
  console.log('Next buf ', next_buffer)

  let expr = structure(next_buffer)
  console.log('Expr ', expr)
  let val = eval_struct(expr);

  return val
}

function structure(buf) {
  if (buf.length === 1) {
    return buf[0]
  }
  buf.shift()
  buf.pop()

  let exp1 = []
  let numpar = 0;
  while (true) {
    let s = buf.shift();
    if (s === '(') {
      numpar += 1;
    } else if (s===')') {
      numpar -= 1;
    }
    exp1.push(s)
    if (numpar === 0) {
      break
    }
  }
  exp1 = structure(exp1)

  let op = buf.shift()
  let exp2 = []
  numpar = 0;
  while (true) {
    let s = buf.shift();
    if (s === '(') {
      numpar += 1;
    } else if (s===')') {
      numpar -= 1;
    }

    exp2.push(s)
    if (numpar === 0) {
      break
    }
  }
  exp2 = structure(exp2)

  return [exp1, op, exp2]
}

function eval_struct(struct) {
  if (typeof struct === 'number') {
    return struct
  }
  if (struct[1] === '+') {
    return eval_struct(struct[0]) + eval_struct(struct[2])
  } else if (struct[1] === '-') {
    return eval_struct(struct[0]) - eval_struct(struct[2])
  } else if (struct[1] === '*') {
    return eval_struct(struct[0]) * eval_struct(struct[2])
  } else if (struct[1] === '/') {
    return eval_struct(struct[0]) / eval_struct(struct[2])
  }
}





export default App
