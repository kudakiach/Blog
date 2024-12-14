import { useAuth, useUser } from "@clerk/clerk-react"
import React, {useEffect, useState} from "react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMutation} from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { FaBeer, FaImage, FaYoutube } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Uploads from "../Components/uploads";


const Write =  () => {

    const [detail, setDetail] = useState('');
    const [session, setSession] = useState('')
    const [cover, setCover] = useState('')
    const [value, setValue] = useState("")
    const [img, setImg] = useState("")
    const [video, setVideo] = useState("")
    const [progress, setProgress] = useState(0);
   
    const {isLoaded, isSignedIn, getToken} = useAuth();
    const navigate = useNavigate();


    useEffect( () =>{
        img && setValue( prev => prev +`<p><img className"" src="${img.url}" /> </p>` )
    }, [img])

    useEffect( () =>{
        video && setValue( prev => prev +`<p><iframe class="ql-video" src="${video.url}" /> </p>` )
    }, [video])

    getToken().then(token=>setSession(token));
    console.log(session)
    const mutation =  useMutation({
        
        mutationFn: async (newPost) => {
            
            
           return await axios.post(`http://localhost:3000/posts`, newPost,
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
            img: cover.filePath || "",
            title:formData.get("title"),
            category:formData.get("category"),
            desc:formData.get("desc"),
            content:value
        };
      
        mutation.mutate(data)
        
    }

    return(
        <div className="h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] flex flex-col">
            <h1 className="my-4 text-2xl font-bold">Create new Post</h1>

            <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 gap-8"> 
                <Uploads type='image' setProgress={setProgress} setData={setCover}>
                    <div className="text-2xl px-4 py-2 bg-white rounded-xl cursor-pointer">Add Cover Image</div>
                </Uploads>
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

                    <Uploads type='image' setProgress={setProgress} setData={setImg}>
                <FaImage className="text-blue-500 text-5xl" />
                </Uploads>
                    <Uploads type='video' setProgress={setProgress} setData={setVideo}>
                    <FaYoutube className="text-blue-500 text-5xl" />
                </Uploads>

                
                       
                       
                    </div>
                    <ReactQuill 
                        theme="snow" 
                        className="flex-1 border-none bg-white rounded-xl q-container" 
                        value={value}
                        onChange={setValue}
                        readOnly={0 < progress && progress < 100}
                    
                    />
                    {mutation.isError ? (
                        
                        <div>
                            {toast.error(mutation.error.message)}
                           
                        </div>
                    ) : null}
                </div>
                
                <button type="submit" disabled={mutation.isPending || (0 < progress && progress < 100)} 
                className="w-max bg-blue-700
                   text-xl font-medium
                 text-white rounded-xl 
                   px-3 py-1 mt-4 disabled:bg-blue-400">
                    {mutation.isPending ? "Loading..." : "Send"}
                </button>
            </form>
            {progress > 0 ? `Show Progress: ${progress} `:"Not uploading"}
        </div>
    )
}

export default Write