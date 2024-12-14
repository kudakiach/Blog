import React from 'react'
import { format } from 'timeago.js'
import ImageKit from './Image'

const Comment = ({data}) => {
  return (
    <div className="mt-8 bg-gray-100  p-2 rounded-xl shadow-xl" >
            <div className="flex gap-4 items-center text-sm text-gray-400">
                {data.user?.img && <ImageKit src={data.user?.img} className="object-cover w-12 h-12 rounded-full" />}
                <span className="font-medium text-gray-700">{data.user.username}</span>
                <span>{format(data.createdAt)}</span>
            </div>
            <p className="mt-2 font-extralight text-sm">
                {data.comment}
            </p>
        </div>
  )
}

export default Comment