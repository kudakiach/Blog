import React from "react";
import { Link } from "react-router-dom";

const MenuActions = () => {

    return(
        <div className="mt-3">
            <h1 className="font-semibold">Actions</h1>
            <div className="flex gap-4">
            <svg
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    stroke="gray"
                >
                <path d="M 10 4C10.3 4, 9, 5.3 9 7v34l15-9 15 9v7c0-1.7-1.3-3-3-3H12z" fill="red" stroke="black"/>
                </svg> 
            <Link> Save this Post</Link>
            </div>
            <div className="flex gap-4">
            <img src="delete.svg" />
            <Link className="text-red-400">Delete this Post</Link>
            </div>                        
        </div>
    )
}

export default MenuActions