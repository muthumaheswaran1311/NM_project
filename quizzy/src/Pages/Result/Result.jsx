import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import "./Result.css";

const Result = () => {
  
  const  [result,setresult] = useState(true);
  const [response,setresponse] = useState(false);
  const token = localStorage.getItem("token");
  const[resultData,setresultData] = useState([]);
  const[responseData,setresponseData] = useState([]);
  
  
  const fetchResults = async() => {
    setresult(true);
    const response = await axios.get("https://nm-project-quizzy.onrender.com/api/showResults",{headers:{token}});
    if(response.data.success){
      setresultData(response.data.resultData);
    }
  }
  return (
    <div>
      <Navbar/>
      <div className='heading-section'>
        <h3 className={result? 'result-heading-content-active':'result-heading-content'}>Result</h3>
        <h3 className={response? 'response-heading-content-active':'response-heading-content'}>Response</h3>
      </div>


    </div>
  )
}

export default Result

