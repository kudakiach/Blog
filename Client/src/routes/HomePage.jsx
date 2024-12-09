import React from "react";
import { Link } from "react-router-dom";
import MainCategory from "../Components/MainCategory";
import FeaturedPost from "../Components/FeaturedPost";
import PostList from "../Components/PostList";


const HompePage = () => {
    const div = ">";
    return(
        <div>
            {/* Breadcrumbs */}
            <div className="flex gap-4 text-sm mb-4">
                <Link to='/'>Home</Link>
                <span className="">{div}</span>
                <span className="text-blue-500">Blogs and Articles</span>
            </div>
            {/* Introduction */}
            <div className="flex justify-between ">
        
                <div className="">
                    {/* title */}
                    <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </h1>
                     {/* description */}
                     <p className="mt-8 text-md md:text-xl"> 
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                     incididunt ut labore et dolore magna aliqua. 
                    
                     </p>
                </div>
                {/* Animated Button */}
                <Link to="write" className="relative hidden md:block">
                    <svg height="200" width="200" viewBox="0 0 200 200">
                        <path
                        id="circlePath" 
                        fill="none"
                        d="M 100 100 m -75 0 a 75, 75 0 1, 1 150, 0 a 75, 75 0 1, 1 -150, 0"
                        className="text-lg tracking-widest animate-spin"
                        />
                        <text>
                            <textPath href="#circlePath" startOffset="0%">Write your story</textPath>
                            <textPath href="#circlePath" startOffset="50%">Share your ideas</textPath>
                        </text>
                    </svg>
                    <button className="absolute top-0 left-0 right-0 bottom-0 w-20 h-20 m-auto bg-blue-800 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="50"
                            height={50}
                            fill="none"
                            stroke="white"
                            strokeWidth={2}
                        >
                            <line xl="6" y1={18} y2={6} x2={18} />
                            <polyline points="9 6 18 6 18 15" />
                        </svg>
                    </button>
                </Link>
               
            </div>
            {/* Main Category */}
            <MainCategory />
            {/* Featured Post */}
            <FeaturedPost />
            {/* Recent Post */}
            <div className="my-8">
                <h1 className="font-bold text-gray-500 mt-8">Recent post</h1>
            </div>
            <PostList />
        </div>
    )
}

export default HompePage