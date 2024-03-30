import React from 'react'
import "./style.scss"
import { CiUser, CiLock } from "react-icons/ci";

const Login = () => {
  return (
    <div className='containers'>
      <div className='wrapper'>
        <form action=''>
          <h1>Login</h1>
          <div className='input-box'>
            <input type='text' placeholder='Email' required/>
            <CiUser className='icon'/>
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' required/>
            <CiLock className='icon'/>
          </div>
          <button type='submit'>Login</button>

          <div className='register-link'>
            <p>Don't have an account ?  
              <a href='#'>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;