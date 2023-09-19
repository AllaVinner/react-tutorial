import { useState } from 'react'
import './App.css'

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
        <label htmlFor='firstName'>First Name: </label>
        <input 
          type='text'
          id={firstNameId}
          name='firstName'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => handleChange(e)}
        />
        <h2>{firstName}</h2>
      </div>
    </>
  )
}

export default App
