import { useMutation } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import useMutationHook from '../hook/useLoginMutation'
import { Link, useNavigate } from 'react-router-dom'

import Notification from './Notification'

const Register = () => {

  const mutation =  useMutationHook('signup');
  const navigate = useNavigate();

  const [error, setError] = useState(null);


  useEffect(() =>{
    setTimeout(()=>{
      if(error) setError(null)
    }, 3000)
  })
 
  const handleLogin = e => {

    e.preventDefault();
    const formData = new FormData(e.target);
    let firstname = formData.get("firstname");
    let lastname= formData.get("lastname");
    let email = formData.get("email");
    let password= formData.get("password");
    
    mutation.mutate({firstname, lastname,email, password}, {
      onError: (error) => { 
        console.log(error.response.data.error)
        toast.error(error.response.data.error)
        setError(error.response.data.error)
      },
      onSuccess: (res) => {
        navigate('/login')
      }
    }
      
    );
  }

  

  return (
    <div className='flex flex-1 h-max justify-center items-center mt-5'>
      <div className='w-1/3 flex flex-col gap-8 items-center  bg-white rounded-2xl'>
        <div className='flex flex-col gap-3 p-2 items-center justify-center pt-5 rounded-md'>
          <h1 className='font-bold text-xl font-sans'>Create your Account</h1>
          <p className='text-sm font-light font-sans'>Welcome back, Enter details to continue</p>
        </div>
        {error &&  <Notification message={error} theme="red" opacity={800} /> }
        <form onSubmit={handleLogin} className='flex gap-2 w-4/5 justify-self-center flex-col rounded-b-2xl' >
          <div className='flex flex-col mb-2'>
          <label className='text-blue-950'>Firstname:</label>
          <input type='text' name="firstname" className='rounded-md p-1 text-black px-2 bg-transparent border border-gray-100 outline-gray-300' placeholder='firstname' />
          </div>
          <div className='flex flex-col mb-2'>
          <label className='text-blue-950'>Lastname:</label>
          <input type='text' name="lastname" className='rounded-md p-1 text-black px-2 bg-transparent border border-gray-100 outline-gray-300' placeholder='lastname' />
          </div>
          <div className='flex flex-col mb-2'>
          <label className='text-blue-950'>Email:</label>
          <input type='text' name="email" className='rounded-md p-1 text-black px-2 bg-transparent border border-gray-100 outline-gray-300' placeholder='Email' autoComplete='' />
          </div>
          <div className='flex flex-col'>
            <label className='text-blue-950'>Password:</label>
          <input type='password' name="password" className='rounded-md p-1 text-black px-2 bg-transparent border  border-gray-100 outline-gray-300' placeholder='Password' autoComplete='' />
          </div>
          
          <button type='submit' className='rounded-md p-1 border bg-blue-800 text-white'>Register</button>
        </form>

        <div className='flex flex-col gap-2 bg-red-100 w-full rounded-t-md rounded-b-2xl justify-centrer items-center py-4 px-2 '>

          <p className='font-sans'>I have an Account?  <Link className='py-1 text-blue-700'>Sign In</Link> </p>
         
          <a href='/register' className='font-light font-sans text-blue-950 '>Reset Password</a>
        </div>
      </div>
    </div>
  )
}

export default Register