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
import { IKContext, IKUpload } from "imagekitio-react";


const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3000/posts/auth');

        if (!response.ok) {
            const errorText = await response.text();
            console.log(`Error Message: ${errorText}`)
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        const { signature, expire, token } = data;
        
        return { signature, expire, token };
    } catch (error) {
        console.log(`Authentication request failed: ${error.message}`)
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};


const onError = err => {
    console.log("Error", err);
    toast.error("Image Upload Failed");
  };
  
  const onSuccess = res => {
    console.log("Success", res);
    setCover(res.filepath)
    toast.message("Image Uploaded Successfuly") 
  };

  

const Write =  () => {

    const [detail, setDetail] = useState('');
    const [session, setSession] = useState('')
    const [cover, setCover] = useState('')
    const [progress, setProgress] = useState(0);

    const onUploadProgress = progress => {
        
        setProgress( Math.floor(progress.loaded / progress.total) * 100 )
        
      };
   
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
            <IKContext publicKey={import.meta.env.VITE_IK_PUBLIC_KEY} urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} authenticator={authenticator} >
                <IKUpload
                useUniqueFileName
                onError={(err)=>{console.log(err)}}
                onSuccess={(res)=>{console.log(res)}}
                onUploadProgress={onUploadProgress}
                />
            </IKContext>
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
                
                <button disabled={mutation.isPending || (0 < progress && progress < 100)} 
                className="w-max bg-blue-700
                   text-xl font-medium
                 text-white rounded-xl 
                   px-3 py-1 mt-4 disabled:bg-blue-400">
                    {mutation.isPending ? "Loading..." : "Send"}
                </button>
            </form>
            {"Progress: " + progress}
        </div>
    )
}

export default Write