import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {apiUrl} from '../api/api'
import axios from 'axios'

export default function UserLogin() {
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [password,setPassword]=useState('')

  const changeComponent = ()=>{
    let loginForm = document.getElementById('login-form')
    let signupForm = document.getElementById('signup-form')
    if(loginForm.classList.contains('hidden')){
      signupForm.classList.add('hidden')
      loginForm.classList.remove('hidden')
    }
    else{
      signupForm.classList.remove('hidden')
      loginForm.classList.add('hidden')
    }
  }
  const loginUser = async (e)=>{
    e.preventDefault()

  }
  const createAccount = async (e)=>{
    e.preventDefault()
    let userData = {
      name, email, password
    }
    const response = await axios.post(apiUrl+'/users/create-user', userData)
    console.log(response);

  }
  return (
    <div id='signup' className=' h-screen'>
      <div id='container' className='bg-white h-[100%] flex overflow-hidden'>
        {/* Login Form */}
        <div className='hidden md:flex flex-1 justify-center items-center bg-[#004FF1]' style={{}}>
          <img className='w-60 h-60' src="https://link.alpha.com.np/wp-content/uploads/2023/05/alpha-link-icon-1.png" alt="" />
        </div>
        <form onSubmit={loginUser} id='login-form' className='flex flex-col space-y-4 flex-1 justify-center px-6 hidden'>
          <h1 className='text-5xl font-bold text-[#004FF1]'>Hi there!</h1>
          <p>Login to your account</p>
          <TextField id="outlined-basic" value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email id" variant="outlined" />
          <TextField id="outlined-basic" value={password} onChange={(e)=>{setPassword(e.target.value)}} label="Password" variant="outlined" />
          <Button type='submit' sx={{backgroundColor:'blue',color:'white'}} >Log in</Button>
          <p className='text-xl self-center'>Don't have account? <span onClick={changeComponent} style={{color:'#004FF1', cursor:'pointer'}}>Create here</span></p>
        </form>
        {/* Signup form */}
        <form onSubmit={createAccount} id='signup-form' className='flex flex-col space-y-4 flex-1 justify-center px-6'>
          <h1 className='text-5xl font-bold text-[#004FF1]'>Hi there!</h1>
          <p>Create your account to get started</p>
          <TextField id="outlined-basic" value={name} onChange={(e)=>{setName(e.target.value)}} label="Your name" variant="outlined" />
          <TextField id="outlined-basic" value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email id" variant="outlined" />
          <TextField id="outlined-basic" value={password} onChange={(e)=>{setPassword(e.target.value)}} label="Password" variant="outlined" />
          <Button type='submit' sx={{backgroundColor:'blue',color:'white'}} >Create account</Button>
          <p className='text-xl self-center'>Already have an account? <span onClick={changeComponent} style={{color:'#004FF1', cursor:'pointer'}}>login here</span></p>
        </form>
      </div>
    </div>
  )
}
