import React, { useState } from 'react'
import Navbar from '../../Components/Navbar.jsx'
import "./Response.css"
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import { Link } from 'react-router-dom'

const Response = () => {

  const[userId,setuserId] = useState("");
  const [userQuestions,setuserQuestions] = useState([]);
  
  const getQuestion = async() => {
    const response = await axios.post("http://localhost:3000/api/user",{userId})
    if(response.data.success){
      setuserQuestions(response.data.userQuestion)
    }
  }

  return (
    <div className='response-section'>
      <Navbar/>
      <h1 className='response-heading'>Attend Quiz !!! </h1>
      <div className='search-question'>
        <p className='search-label'>Search Questions</p>
        <input type='text' placeholder='Enter User Id' className='id-input' onChange={(event)=>{
          setuserId(event.target.value)
        }}/>
        <FontAwesomeIcon icon={faArrowRight} className='arrow-icon' onClick={getQuestion} />
      </div>
      <div className='user-question-set'>
        {userQuestions ? userQuestions.map((item,index)=>(
          <div key={index} className='user-question'>
            <h1>{item.quizname}</h1>
            <p>Total Questions: {item.questionname.length} </p>
           <Link to={`/evaluate/${item._id}`}><button>Attend now</button></Link> 
          </div>
        )) : <p>Search questions by the user Id</p>}
      </div>
    </div>
  )
}

export default Response