import React from 'react'
import {useMutation} from '@tanstack/react-query';
import axios from 'axios'

const useMutationHook = (path) => {
  return useMutation( {
    mutationFn:  async (data) => {
        const res = await axios.post(`http://localhost:3000/auth/${path}`, data);
        return res;
      }
  }
    )
}

export default useMutationHook