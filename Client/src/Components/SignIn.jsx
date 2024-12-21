import { useMutation } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import useLoginMutation from '../hook/useLoginMutation'
import { toast } from 'react-toastify'
import useMutationHook from '../hook/useLoginMutation'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Notification from './Notification'
import { jwtDecode } from 'jwt-decode'

const LoginIn = () => {

  const mutation =  useMutationHook('signin');
  const navigate = useNavigate();
  const {setUser, setToken} = useContext(AuthContext);
  const [error, setError] = useState(null);


  useEffect(() =>{
    setTimeout(()=>{
      if(error) setError(null)
    }, 3000)
  })
 
  const handleLogin = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let email = formData.get("email");
    let password= formData.get("password")
    
    mutation.mutate({email, password}, {
      onError: (error) => { 
        console.log(error.response.data.error)
        toast.error(error.response.data.error)
        setError(error.response.data.error)
      },
      onSuccess: (res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        setUser(jwtDecode(res.data.token))
        navigate('/')
      }
    }
      
    );
  }

  

  return (
    <div className='flex flex-1 h-max justify-center items-center mt-5'>
      <div className='w-1/3 flex flex-col gap-8 items-center  bg-white rounded-2xl'>
        <div className='flex flex-col gap-3 p-2 items-center justify-center pt-5 rounded-md'>
          <h1 className='font-bold text-xl font-sans'>Sign in to KudaBlog</h1>
          <p className='text-sm font-light font-sans'>Welcome back, Enter details to continue</p>
        </div>
        {error &&  <Notification message={error} theme="red" opacity={800} /> }
        <form onSubmit={handleLogin} className='flex gap-2 w-4/5 justify-self-center flex-col rounded-b-2xl' >
          <div className='flex flex-col mb-2'>
          <label className='text-blue-950'>Email:</label>
          <input type='text' name="email" className='rounded-md p-1 text-black px-2 bg-transparent border border-gray-100 outline-gray-300' placeholder='Email/username' />
          </div>
          <div className='flex flex-col'>
            <label className='text-blue-950'>Password:</label>
          <input type='password' name="password" className='rounded-md p-1 text-black px-2 bg-transparent border  border-gray-100 outline-gray-300' placeholder='Password' />
          </div>
          
          <button type='submit' className='rounded-md p-1 border bg-blue-800 text-white'>Login</button>
        </form>

        <div className='flex flex-col gap-2 bg-red-100 w-full rounded-t-md rounded-b-2xl justify-centrer items-center py-4 px-2 '>

          <p className='font-sans'>Dont have an account?  <a className='py-1 text-blue-700'>Sign Up</a> </p>
         
          <a href='/register' className='font-light font-sans text-blue-950 '>Reset Password</a>
        </div>
      </div>
    </div>
  )
}

export default LoginIn