import React from "react"
import { Link } from "react-router-dom"
import ImageKit from "./Image"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  import {format} from 'timeago.js'


  

const PostListItem = ({post}) => {

    

    return(
        <div className="flex flex-col lg:flex-row xl:flex-row gap-8 mb-6">
            {/* Image */}
            {post.img && <div className="md:hidden xl:block lg:block lg:w-2/3 xl:w-1/3">
            {/* <ImageKit path="postImg.jpeg"  w={735} description={"postImg"} /> */}
                 <ImageKit 
                    src={`${post.img}`} 
                    className={"rounded-2xl object-cover"} 
                    w={735} 
                    description={post.slug}                />
            </div>}
            {/* Details */}
            <div className="flex flex-col gap-4 lg:w-2/3 xl:w-2/3">
                <Link to={`/${post.slug}`} className="text-4xl font-semibold">
                    {post.title}
                </Link>
                <div className="flex items-center gap-2 text-sm">
                    <span>Writen By</span>
                    <Link className="text-blue-500">{post.user.username}</Link>
                    <span >On</span>
                    <Link className="text-blue-800">{post.category}</Link>
                    <span className="text-gray-600">{format(post.createdAt)}</span>
                </div>
                <p>
                {post.desc}
                </p>
                <Link to={`/${post.slug}`} className="text-blue-800 text.sm">Read more...</Link>
            </div>
        </div>
    )
}

export default PostListItem