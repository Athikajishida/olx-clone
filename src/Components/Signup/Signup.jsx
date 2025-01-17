import React, { useContext, useEffect, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { signUp } from '../../Firebase/Config';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userProvider';

export default function Signup() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const signedUp = await signUp(userName, email, phone, password)
      if (signedUp) {
        navigate('/login')
      }
    } catch (error) {
        console.log(error)
    }          
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSignup}>
         
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Username'
          />
          <br />
          
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <br />
        
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Phone Number'
          />
          <br />
          
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <br />
       
          <div className='signup-button'>
            <button type='submit'>Signup</button>
          </div>
          
        </form>
        <div className="login-path">
          Already Have an account?
          <a onClick={() => {navigate('/login')}}>Login</a>
        </div>
        
      </div>
    </div>
  );
}
