import React from "react";

const Search = ()=> {
    return (
        <div className="mt-2 bg-gray-100 p-2 rounded-full flex gap-2 items-center">
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
    )
}

export default Search