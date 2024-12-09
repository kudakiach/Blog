import { react } from "react";
import { Link } from "react-router-dom";

const MainCategory = () => {
    return (
        <div className="hidden md:flex mt-8 bg-white p-4 md:rounded-4xl rounded-3xl items-center justify-center shadow-lg gap-8">
            {/* Links */}
            <div className="flex-1 flex flex-wrap items-center justify-between">
                <Link to="/posts" className="rounded-2xl bg-blue-700 px-4 py-2 text-white">All Posts</Link>
                <Link to="/posts?cat=development" className="">Development</Link>
                <Link to="/posts?cat=webdesign" className="">Web Design</Link>
                <Link to="/posts?cat=seo" className="">SEO</Link>
                <Link to="/posts?cat=marketing" className="">Marketing</Link>
            </div>
            <span className="text-xl font-medium">|</span>
            {/* Search */}
            <div className="bg-gray-100 p-2 rounded-full flex gap-2 items-center">
                <svg
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    fill="none"
                    stroke="gray"
                >
                    <circle cx="10.5" cy="10.5" r="7.5" />
                    <line x1={16.5} y1={16.5} x2={22} y2={22}></line>
                </svg>
                <input type="text" placeholder="search a post" className="bg-transparent" />
            </div>
        </div>
    )
}

export default MainCategory;