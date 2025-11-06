import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar.jsx'
import "./MyQuestion.css"
import axios from 'axios'

const MyQuestion = () => {
  const token = localStorage.getItem("token");
  const [myQuestion,setmyQuestion] = useState([])
  const fetchQuestion = async() => {
    const response = await axios.get("https://nm-project-quizzy.onrender.com/api/fetch",{headers:{
      token
    }})
    if(response.data.success){
      setmyQuestion(response.data.questionData)
      console.log("Fetched")
    }
  }
  useEffect(()=>{
    fetchQuestion();
    console.log(myQuestion);
  },[])

  return (
    <div className='my-question'>
      <Navbar/>
      <h1 className='my-question-heading'>My Question</h1>
      {myQuestion ? 
      <div className='question-set'>
        {myQuestion.map((item,index)=>(
        <div key={index} className='question'>
          <h1>{item.quizname}</h1>
          <button className='delete-button'>DELETE</button>
          <p>Total Questions: {item.questionname.length}</p>
        </div>
      ))}
      </div>
       : <p>No questions</p> }
    </div>
  )
}

export default MyQuestion
