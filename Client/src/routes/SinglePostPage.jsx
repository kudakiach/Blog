import React from "react"
import { Link } from "react-router-dom"
import ImageKit from "../Components/Image"
import MenuActions from "../Components/MenuActions"
import Search from "../Components/Search"
import Comments from "../Components/Comments"

const SinglePostPage = () => {
    return(
        <div className="flex flex-col">
           <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-4 lg:w-3/5">
                    <h1 to="" className="text-xl md:text-3xl lg:text-4xl font-semibold">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </h1>
                    <div className="flex items-center gap-2 text-sm">
                        <span>Writen By</span>
                        <Link className="text-blue-500">John Doe</Link>
                        <span >On</span>
                        <Link className="text-blue-800">Web Design</Link>
                        <span className="text-gray-600">2 days ago</span>
                    </div>
                    <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </p>
                </div>

                <div className="hidden lg:block lg:w-2/5 ">
                {/* <ImageKit path="postImg.jpeg"  w={735} description={"postImg"} /> */}
                <img src="postImg.jpeg" className="rounded-2xl object-cover" width={600} />
                </div>
           </div>
            
            <div className="flex gap-8 mt-8">
                <div className="flex flex-col w-2/3">
                <p className="text-justify font-light text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <div className="mt-4">
                    <h1 className="underline mb-4">Comments</h1>
                    <div className="flex gap-8">
                        <textarea className="w-2/3 rounded-md">

                        </textarea>  
                        <button className="p-2 bg-blue-800 text-white rounded-3xl">Send</button>          
                    </div>

                    <Comments />
                    <Comments />
                    <Comments />
                    <Comments />
                    
                </div>
                </div>
                <div className="px-4 sticky h-max top-8 w-1/3">
                        <h1 className="font-semibold">Author</h1>
                    <div className="flex flex-row gap-4 mt-2 items-center">
                        
                        <img src="userImg.jpeg" className="w-12 h-12 rounded-full aspect-video object-cover" width={48} height={48} />
                        <Link className="text-blue-700"> Samuel K.</Link>
                        
                    </div>
                    <p className="text-xs mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="flex mt-2 gap-4">
                        <img src="facebook.svg" />
                        <img src="instagram.svg" />
                    </div>
                    {/* Action */}
                    <MenuActions />

                    {/* Category */}

                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold mt-4 mb-3"> Categories</h1>
                        <Link className="text-sm underline"> All </Link>
                        <Link className="text-sm underline"> Web Design </Link>
                        <Link className="text-sm underline"> Web Development </Link>
                        <Link className="text-sm underline"> SEO </Link>
                    </div>

                    {/* Search */}
                    <h1 className="mt-4">Search</h1>
                    <Search />
                </div>
                
            </div>
            
        </div>
    )
}

export default SinglePostPage