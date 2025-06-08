import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'

function App  ()  {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp/>} />
       <Route path='/signin' element={<Signin/>} />

    </Routes>
  )
}

export default App