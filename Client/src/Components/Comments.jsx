import React from "react";


const Comments = () => {
    return (

        <div className="mt-8 bg-gray-100  p-2 rounded-xl shadow-xl">
            <div className="flex gap-4 items-center text-sm text-gray-400">
                <img src="userImg.jpeg" className="object-cover w-12 h-12 rounded-full" />
                <span className="font-medium text-gray-700">John Doe</span>
                <span>2 days ago</span>
            </div>
            <p className="mt-2 font-extralight text-sm">
                ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim
            </p>
        </div>
    )
}

export default Comments