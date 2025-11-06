import React, { useState } from 'react'
import Navbar from '../../Components/Navbar.jsx'
import './Create.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const[quizname,setquizname] = useState("");
  const[questionname,setquestionname] = useState([""]);
  const [options, setoptions] = useState([["", ""]]);  
  const [correctanswer,setcorrectanswer] = useState([0]);
  const token=localStorage.getItem("token")
  const navigate = useNavigate();
  
  const addQuestion = () => {
    setquestionname([...questionname,""])
    setoptions([...options,["",""]])
    setcorrectanswer([...correctanswer,0]);
  }
  const addOption = (ind) => {
    setoptions(options.map((item,index)=>index===ind ? [...item,""] : item))
  }
  const questionnameHandler = (event,question) => {
    setquestionname(questionname.map((item,index)=>index===question ? event.target.value : item))
  }
  const optionHandler = (event,option,required) => {
    const updated = [...options];
    updated[option][required] = event.target.value;
    setoptions(updated)
  }

  const deleteQuestion = (ind) => {
    setquestionname(questionname.filter((item,index)=> index!=ind))
    setoptions(options.filter((item,index)=>index!=ind))
    setcorrectanswer(correctAnswer.filter((item,index)=>index !=ind))
  }

  const correctAnswer = (event,ind) => {
    setcorrectanswer(correctanswer.map((item,index)=> index === ind ? event.target.value-1 : item ));
  }
  const newQuestion = async() => {
    const questionSet = {quizname,questionname,options,correctanswer}  
    const response = await axios.post("http://localhost:3000/api/create",questionSet,{headers:{token}})
    if(response.data.success){
      navigate("/question")
    }
  }
  
  return (
    <div className='create-section'>
      <h1 className='heading'>Question !!!</h1>
      <div className='question-name'>
        <label className='input-label'>Enter Quiz name</label>
        <input type='text' placeholder='Type here' className='input-name' onChange={(event)=>setquizname(event.target.value)} />
      </div>
      <div>
        {questionname.map((item,questionindex)=>
          <div key={questionindex} className='question-tab'>
            {questionindex>0 && <FontAwesomeIcon icon={faXmark} className='x-mark' onClick={()=>deleteQuestion(questionindex)} /> }
            <label className='name-label'>Question {questionindex+1} </label><br></br>
            <input type='text' className='question-input' placeholder='Type here' onChange={(event)=>questionnameHandler(event,questionindex)} />
            
            {options.map((item,optionindex)=> optionindex===questionindex &&
               <div key={optionindex}>
                <br></br>
                <label className='option-label'>Enter Option</label>
                <div className='option-input-tab'  key={optionindex}>
                  {item.map((options,index)=> 
                    <div key={index} >
                      <input type='text' className='option-input' placeholder={`option ${index+1}`} onChange={(event)=>optionHandler(event,optionindex,index)}/>
                    </div>
                  )}
                </div> 
               </div>
               
            )  
            }
            <button onClick={()=>addOption(questionindex)} className='add-options' >Add Options</button><br></br>
            <input type='number'  placeholder='Enter Correct Option number' className='correct-answer' onChange={(event)=>correctAnswer(event,questionindex)} />
          </div>
         
        )}
        
        <button onClick={addQuestion} className='add-questions'>Add Question</button>
        <button onClick={newQuestion} className='submit-button'>Submit</button>
      </div>
    </div>
  )
}

export default Create