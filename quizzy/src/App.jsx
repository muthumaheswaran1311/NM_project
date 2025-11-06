import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Pages/Home/Home.jsx'
import Create from './Pages/Create/Create.jsx'
import MyQuestion from './Pages/MyQuestion/MyQuestion.jsx'
import Response from './Pages/Response/Response.jsx'
import Login from './Pages/Login/Login.jsx'
import Evaluate from './Pages/Evaluate/Evaluate.jsx'
import Result from './Pages/Result/Result.jsx'


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/create' element= {<Create />} />
          <Route path='/question' element={<MyQuestion/>}/>
          <Route path='/response' element={<Response/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/evaluate/:id' element={<Evaluate/>}/>
          <Route path='/result' element={<Result/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App