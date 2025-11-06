import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar';
import "./Evaluate.css";

const Evaluate = () => {
    const {id} =useParams();
    const navigate = useNavigate();
    const[paper,setpaper] =useState({});
    const[exactAnswer,setexactAnswer] = useState([]);
    const [steppoints,setsteppoints] = useState([]);
    const[total,settotal] = useState(0);
    const authorId = paper.userId;
    const correctAnswer = paper.correctanswer;
    const questionId = paper._id;
    const token=localStorage.getItem("token");
    
    const getQuestion = async() => {
        const response = await axios.post("http://localhost:3000/api/paper",{id});
        if(response.data.success){
            setpaper(response.data.questionPaper);
            
        }
    }
    const evaluate = (questionno, optionno) => {
    const updated = [...exactAnswer];
    updated[questionno] = optionno;
    setexactAnswer(updated);

    const updatedpoint = [...steppoints];
    if (correctAnswer[questionno] === updated[questionno]) {
        updatedpoint[questionno] = 1;
    } else {
        updatedpoint[questionno] = 0;
    }
    setsteppoints(updatedpoint);
    settotal(updatedpoint.reduce((sum, value) => sum + value, 0));  
    };

    const sendResults = async() => {
        const data = {exactAnswer,steppoints,total,questionId,authorId};
        const response = await axios.post("http://localhost:3000/api/results",{data},{headers:{token}});
        if(!token){
            navigate("/login");
        }
        if(response.data.success){
            
            navigate("/result");
        }
    }

    useEffect(()=>{
        getQuestion();
    },[])
  return (
    <div>
      <Navbar/>
      <h1 className='paper-heading'>{paper.quizname}</h1>
      <p className='paper-user-id'><b>Author ID:</b> {paper.userId}</p>
      <div className='paper-question-set'>
        {paper.questionname && paper.questionname.map((question,index)=>(
            <div key={index} className='paper-questions'>
                <p className='paper-question'>{index+1}. {question}</p>
                <div className='paper-options'>
                    { paper.options && paper.options?.map((option,optionIndex)=>( optionIndex===index && (
                        <div className='paper-options'key={optionIndex}>
                            {option?.map((item,ind)=>(<div>
                                <p key={ind} className={exactAnswer[index]===ind ? "paper-option-selected":"paper-option"} onClick={()=>evaluate(index,ind)}>{item}</p>
                            </div>))}
                        </div>
                    ) ))}
                </div>
            </div>
        ))}
      </div>
      
      <button className='answer-submit' onClick={()=>sendResults()}>Submit</button>
    </div>
  )
}

export default Evaluate
