import React from "react"
import { Link } from "react-router-dom"
import ImageKit from "./Image"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'


const PostListItem = () => {


    return(
        <div className="flex flex-col lg:flex-row xl:flex-row gap-8">
            {/* Image */}
            <div className="md:hidden xl:block lg:block lg:w-2/3 xl:w-1/3">
            {/* <ImageKit path="postImg.jpeg"  w={735} description={"postImg"} /> */}
                 <img src="postImg.jpeg" className="rounded-2xl object-cover" width={735} />
            </div>
            {/* Details */}
            <div className="flex flex-col gap-4 lg:w-2/3 xl:w-2/3">
                <Link to="" className="text-4xl font-semibold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Link>
                <div className="flex items-center gap-2 text-sm">
                    <span>Writen By</span>
                    <Link className="text-blue-500">John Doe</Link>
                    <span >On</span>
                    <Link className="text-blue-800">Web Design</Link>
                    <span className="text-gray-600">2 days ago</span>
                </div>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
                <Link to="/test" className="text-blue-800 text.sm">Read more...</Link>
            </div>
        </div>
    )
}

export default PostListItem