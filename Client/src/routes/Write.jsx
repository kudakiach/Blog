import { useUser } from "@clerk/clerk-react"
import React, {useState} from "react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


const Write = () => {

    const {isLoaded, isSignedIn} = useUser();
   

    if(!isLoaded) {
        return <div>Loading...</div>
    }

    if(isLoaded && !isSignedIn) {
        return <div>You are not sign in</div>
    }

    return(
        <div className="h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] flex flex-col">
            <h1>Create new Post</h1>

            <form className="flex flex-col flex-1 gap-8"> 
                <button className="w-max shadow-md bg-white px-3 py-2 rounded-xl text-sm">Add image cover</button>

                <input type="text" className="outline-0 text-2xl font-bold bg-transparent border-none" placeholder="My Awesome Story" />

                <div className="flex items-center gap-3">
                    <label htmlFor="">Choose Category</label>
                    <select className="p-2 rounded-xl shadow-md">
                        <option id="cat" value={"Web Design"}>Web Design</option>
                        <option id="cat" value={"Web Development"}>Web Development</option>
                        <option id="cat" value={"Programming"}>Programming</option>
                        <option id="cat" value={"WMarketting"}>Marketing</option>
                        <option id="cat" value={"SEO"}>Search Engines</option>
                        
                    </select>
                </div>
                <textarea placeholder="Write short description" className="p-2 rounded-xl h-12"></textarea>

                <ReactQuill theme="snow" className="flex-1 border-none bg-white rounded-xl q-container" />
                <button className="w-max bg-blue-700 text-xl font-medium text-white rounded-xl px-3 py-1 mt-4">Send</button>
            </form>
        </div>
    )
}

export default Write