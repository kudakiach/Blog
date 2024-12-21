import React, { createContext, useState, useEffect } from 'react'
// import verifyToken from '../hook/verifyTokenHook';
// import { Navigate, useNavigate, } from 'react-router-dom';
// import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState('')
  const [user, setUser] = useState();
  
  useEffect(() => {
    try{
      setToken(localStorage.getItem('token'))
      setUser(jwtDecode(token))
    }catch(err){
      console.log(err)
    }
      
    
  }, [token]);





  return (
    <AuthContext.Provider
      value={{ token, user, setToken, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
