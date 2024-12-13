import { useAuth, useUser } from "@clerk/clerk-react"
import React, {useState} from "react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMutation} from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { FaBeer, FaImage, FaYoutube } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Write =  () => {
        
    const [detail, setDetail] = useState('');
    const [session, setSession] = useState('')
   
    const {isLoaded, isSignedIn, getToken} = useAuth();
    const navigate = useNavigate();
   

    getToken().then(object => {
        console.log(object)
        setSession(object);
    });
    const mutation =  useMutation({
        mutationFn: async (newPost) => {
           return await axios.post('http://localhost:3000/posts', newPost,
            { 
             headers: {
                Authorization:`Bearer ${session}`
             }
 
            }
           )
         },
         onSuccess: (res)=> {
            toast.success("Post has been created")
            navigate(`/${res.data.slug}`)
         }
     })
    

    
 
   
    
    if(!isLoaded) {
        return <div>Loading...</div>
    }
 
    if(isLoaded && !isSignedIn) {
        return <div>You are not sign in</div>
    }

    

    
    const handleFormSubmit = e => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data =  {
            title:formData.get("title"),
            category:formData.get("category"),
            desc:formData.get("desc"),
            content:detail
        };
      
        console.log(data)
        mutation.mutate(data)
        
    }

    return(
        <div className="h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] flex flex-col">
            <h1>Create new Post</h1>

            <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 gap-8"> 
                <button className="w-max shadow-md bg-white px-3 py-2 rounded-xl text-sm">Add image cover</button>

                <input 
                    type="text" 
                    className="outline-0 text-2xl font-bold bg-transparent border-none"
                    placeholder="My Awesome Story"
                    name="title" 
                />

                <div className="flex items-center gap-3">
                    <label htmlFor="">Choose Category</label>
                    <select className="p-2 rounded-xl shadow-md" name="category">
                        <option id="cat" value={"general"}>General</option>
                        <option id="cat" value={"WebDesign"}>Web Design</option>
                        <option id="cat" value={"WebDevelopment"}>Web Development</option>
                        <option id="cat" value={"Programming"}>Programming</option>
                        <option id="cat" value={"Marketting"}>Marketing</option>
                        <option id="cat" value={"SEO"}>Search Engines</option>
                        
                    </select>
                </div>
                <textarea 
                    placeholder="Write short description" 
                    className="p-2 rounded-xl h-12"
                    name="desc"
                >
                </textarea>
                <div className="flex flex-row gap-3 flex-1">
                    <div className="flex flex-col gap-8">
                        <FaYoutube className="text-blue-500 text-5xl" />
                        <FaImage className="text-blue-500 text-5xl" />
                    </div>
                    <ReactQuill 
                        theme="snow" 
                        className="flex-1 border-none bg-white rounded-xl q-container" 
                        value={detail}
                        onChange={setDetail}
                    
                    />
                    {mutation.isError ? (
                        
                        <div>
                            {toast.error("")}
                            {mutation.error.message}
                        </div>
                    ) : null}
                </div>
                
                <button disabled={mutation.isPending} 
                className="w-max bg-blue-700
                   text-xl font-medium
                 text-white rounded-xl 
                   px-3 py-1 mt-4 disabled:bg-blue-400">
                    {mutation.isPending ? "Loading..." : "Send"}
                </button>
            </form>
        </div>
    )
}

export default Write