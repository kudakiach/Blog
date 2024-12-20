import React, { createContext, useState, useEffect } from 'react'
// import verifyToken from '../hook/verifyTokenHook';
// import { Navigate, useNavigate, } from 'react-router-dom';
// import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState(jwtDecode(token));

  useEffect(() => {
    try {
      let decodedToken= jwtDecode(token);
      setUser(decodedToken)
      let currentDate = new Date();
      console.log(user)
      if (user.exp * 1000 < currentDate.getTime()) {
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
      value={{ isValid, setIsValid, token, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
