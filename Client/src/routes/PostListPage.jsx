import React, { useState } from "react"
import PostList from "../Components/PostList"
import SideMenu from "../Components/SideMenu";

const PostListPage = () => {
    const [open, setOpen] = useState();
    return(
        <div className="">
            <h1>Development blog</h1>
            <button onClick={()=>setOpen(prev => (!prev))} className="bg-blue-800 md:hidden text-white p-2 mb-2 mt-2 rounded-xl">
                    {open?'close':"search and Filter"}
            </button>

            <div className="flex flex-col-reverse md:flex-row gap-8 mt-4">
                <div>
                    <PostList />
                </div>
                {/* Side Menu */}
                <div className={`${open? "block": "hidden"} md:block` }>
                    <SideMenu />
                </div>
            </div>
            
            
        </div>
    )
}

export default PostListPage