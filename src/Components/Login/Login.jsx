import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup'


import Logo from '../../olx-logo.png';
import './Login.css';
import { login } from '../../Firebase/Config';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userProvider';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const [errors,setErrors] = useState();
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })

  const validationSchema = Yup.object({
    email:Yup.string().required('Email is required').email('Invalid email format'),
    password:Yup.string().required('Password is required').min(8,'must be atleast 8 characters')
  })

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData,{abortEarly:false})
      const logined = await login(formData.email, formData.password)
      if (logined) {
        navigate('/')
      }

    } catch (e) {
      const newErrors = {};
      e.inner.forEach(err=>{
        newErrors[err.path] = err.message;
      })

      setErrors(newErrors)
    }
  }
  
  const handleChange = (e)=>{
    const {name,value} = e.target;

    setFormData({
      ...formData,
      [name] : value
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          
       
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
          />
          {errors?<div className='error'>{errors.email}</div>:<></>}
          <br />
          
     
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
          />
          {errors?<div className='error'>{errors.password}</div>:<></>}
          <br />
 
          <div className='login-button'>
            <button type='submit' >Login</button>
          </div>
          
        </form>
        <div className="signup-path">
          don't have an account?
          <a onClick={() => navigate('/signup')}>Signup</a>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
