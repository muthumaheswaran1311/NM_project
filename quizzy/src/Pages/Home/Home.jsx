import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Home.css"
import Navbar from '../../Components/Navbar.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faQuestion,faReply } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  const navigate = useNavigate();

  return (
    <>
       <Navbar/>
       <div className='home-section'>
          <h1 className='heading'> Make your questions <span className='key-word'>Digitalized</span> </h1>
          <div className='features'>
            <div className='feature' onClick={()=>navigate('/create')}>
              <FontAwesomeIcon icon={faPlus} className='feature-icon'/>
              <h2 className='feature-heading'>Create Questions</h2>
              <p className='feature-context'>Make your own questions and let others can answer it.</p>
            </div>
            <div className='feature' onClick={()=>navigate('/question')}>
              <FontAwesomeIcon icon={faQuestion} className='feature-icon'/>
              <h2 className='feature-heading'>My Questions</h2>
              <p className='feature-context'>Questions created by is saved here and you can modify,delete the questions if you want.</p>
            </div>
            <div className='feature' onClick={()=>navigate('/response')}>
              <FontAwesomeIcon icon={faReply} className='feature-icon'/>
              <h2 className='feature-heading'>Response</h2>
              <p className='feature-context'>Here,you can see the response that are made by users who all are answered your questions.</p>
            </div>

          </div>
       </div>
    </>
  )
}

export default Home