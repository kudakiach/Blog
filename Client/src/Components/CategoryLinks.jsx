import React from 'react'
import { Link } from 'react-router-dom'

const CategoryLinks = () => {
  return (
   
        <div className="flex flex-col gap-2">
            <h1 className="font-semibold mt-4 mb-3"> Categories</h1>
            <Link className="text-sm underline"> All </Link>
            <Link className="text-sm underline"> Web Design </Link>
            <Link className="text-sm underline"> Web Development </Link>
            <Link className="text-sm underline"> SEO </Link>
        </div>
   
  )
}

export default CategoryLinks