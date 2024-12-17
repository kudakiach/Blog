import React from 'react'
import {useMutation} from '@tanstack/react-query'

const verifyToken = (token) => {
    return useMutation( {
      mutationFn:  async (data) => {
          const res = await axios.post(`http://localhost:3000/auth/verify`, data, {
            header:{
                Authorization:`Bearer ${token}`
            }
          });
          return res;
        }
    }
      )
  }

export default verifyToken