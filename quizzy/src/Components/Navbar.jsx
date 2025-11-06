import React, { useState } from 'react'
import logo from "/src/assets/logo.png"
import "./Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const[menu,setmenu] = useState(true);
  const [token,settoken] = useState(localStorage.getItem("token"))

  const Logout = () => {
    localStorage.removeItem("token");
    settoken("")
  }

  return (
    <>
    <div className='nav-bar'>
    <Link to="/"><img src={logo} className='logo'/></Link>
      <ul className='nav-features'>
        <li>Create</li>
        <li>My Questions</li>
        {token ?<FontAwesomeIcon icon={faUser} className='profile' onClick={Logout} />:<Link to="/login"><li>Login</li></Link>}
      </ul>
      {menu ? <FontAwesomeIcon icon={faBars} className='menu-icon' onClick={()=>setmenu(false)}  />:<FontAwesomeIcon icon={faXmark} className='menu-icon' onClick={()=>setmenu(true)}  /> }
    </div>
    {!menu?<div className='mobile-nav-features'> 
        <p>Create</p>
        <p>My Question</p>
       <Link to="/login"><p>Login</p></Link>
    </div>:<></>}
    </>
  )
}

export default Navbar