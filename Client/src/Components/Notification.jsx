import React, { useEffect, useState } from 'react'

const Notification = ({message, theme, opacity}) => {
    const [visible, setVisible] = useState(true);

useEffect( ()=>{
const timer = setTimeout( ()=> {
    setVisible((prev)=> !prev);
}, 3000)
return ()=>{
    clearTimeout(timer)
}
}, [])

if(!visible) return null;

  return (
   <div className={`bg-red-800 px-6 py-1 rounded-lg text-white font-sans text-sm`}>
    {message}
   </div>
  )
}

export default Notification