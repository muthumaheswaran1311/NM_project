import React from 'react'
import "./Login.css"
import Navbar from '../../Components/Navbar'
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [Login,setLogin] = useState(true);
  const [username,setusername] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [token,settoken] = useState("");
  const navigate = useNavigate();

  const LoginApi = async()=> {
    const response = await axios.post("https://nm-project-quizzy.onrender.com/api/login",{email,password})
    if(response.data.success){
      settoken(response.data.token);
      localStorage.setItem("token",response.data.token)
      navigate("/");
    }
  }

  const RegisterApi = async()=> {
    const response = await axios.post("https://nm-project-quizzy.onrender.com/api/register",{username,email,password})
    if(response.data.success){
      settoken(response.data.token);
      localStorage.setItem("token",response.data.token)
      console.log(token)
      navigate("/");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      if(Login){
      LoginApi()
    }
    else{
      RegisterApi()
    }
    }
    catch(err){
      console.log(err);
    }
    

  }

  return (
    <div className='login-body'>
      <Navbar />
      <div className='login-container'>
        <form onSubmit={handleSubmit}>
          {Login ? <h1 className='heading-input'>Login</h1> : <h1 className='heading-input'>Register</h1>}

          {!Login && (
            <div className='input'>
              <label htmlFor="username" className='input-label'>Enter Username</label><br />
              <input id='username' type='text' onChange={(e) => setusername(e.target.value)} className='input-tag' autoComplete='username' />
            </div>
          )}

          <div className='input'>
            <label htmlFor="email" className='input-label'>Enter Email</label><br />
            <input id='email' type='text' onChange={(e) => setemail(e.target.value)} className='input-tag' autoComplete='email' />
          </div>

          <div className='input'>
            <label htmlFor="pass" className='input-label'>Enter Password</label><br />
            <input id='pass' type='password' onChange={(e) => setpassword(e.target.value)} className='input-tag' autoComplete="current-password"  />
          </div>

          <button type='submit' className='login-button'>
            {Login ? "Sign In" : "Sign Up"}
          </button>

          {Login ? (
            <p className='link'>Don’t have an account? 
              <span className='span-link' onClick={() => setLogin(false)}> Sign Up</span>
            </p>
          ) : (
            <p className='link'>Already have an account? 
              <span className='span-link' onClick={() => setLogin(true)}> Sign In</span>
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
