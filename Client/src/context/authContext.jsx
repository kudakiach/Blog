import React, { createContext, useState, useEffect } from 'react'
import verifyToken from '../hook/verifyTokenHook';
import { Navigate, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {

    try {
      const decodedToken = jwtDecode(token)
      let currentDate = new Date();
      console.log(decodedToken)
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
      } else {
        console.log("Valid token");
        setIsValid(true)
      }
    } catch (err) {
      setIsValid(false)
      console.log(err)
    }

  }, [token]);





  return (
    <AuthContext.Provider
      value={{ isValid, setIsValid }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
