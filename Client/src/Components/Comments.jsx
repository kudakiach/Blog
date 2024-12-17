import React, { useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useQuery, QueryClient, useQueryClient, useMutation  } from "@tanstack/react-query"
import Comment from "./Comment";
import { toast } from "react-toastify";
import { useAuth, useUser,  } from "@clerk/clerk-react";



const fetchComments = async (postId) => {
    //${import.meta.env.VITE_API_URL}
    const res = await axios.get(`http://localhost:3000/comments/${postId}`)
    console.log(res.data)
    return res.data
}

const Comments = ({postId}) => {

   
    const {isLoaded, isSignedIn, getToken} = useAuth();
    const [session, setSession] = useState("");
    // const [comments, setComments] = useState({comment:''})
  
    
    const { user } = useUser();
    
    const { isPending, error, data } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => fetchComments(postId),
    })

   
    getToken().then( token=>
        setSession(token)
    )

    const queryClient = useQueryClient();
    const mutation =  useMutation({
       
        mutationFn: async (newComment) => {
            
            
           return await axios.post(`http://localhost:3000/comments/${postId}`, newComment,
            { 
             headers: {
                Authorization:`Bearer ${session}`,
                
             }
 
            }
           )
         },
         
         onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["comments", postId]})
         }
        
     })

     const handleCommentSubmit = e => {
        e.preventDefault()

        const formData = new FormData(e.target);

        const comments = {
            comment:formData.get("comment")
        }
        
        mutation.mutate(comments, {
            onSuccess: () => {
                toast.success("Comment Sent")
                e.target.reset();
            }, 
            onError:(error) => {
                toast.error("Failed to Comment" + error)
            }
        })
        
        
    }

    //   

    return (

        <div>
            <h1 className="underline mb-4 text-2xl font-bold mt-3">Comments</h1>
            <form onSubmit={handleCommentSubmit} className="flex gap-8">
                <textarea className="w-2/3 rounded-md p-2" name="comment" placeholder="Leave a Comment">

                </textarea>
                <button className="p-2 bg-blue-800 w-1/5 text-white rounded-2xl">
                   <span className="font-bold text-2xl">Send</span> 
                </button>
            </form>

            {
                isPending ? ("loading..."): error ? (
                    "Error Loading Comments"
                ): (
                <>
                {mutation.isPending && (
                    <Comment 
                        data={{
                            comment: `${mutation.variables.comment} (Sending...)`,
                            createdAt: new Date(),
                            user: {
                                img: user.imageUrl,
                                username:user.username,
                            },
                            
                        }}
                        
                
                    />
                )}
                {data.map((comment) => (
                    <Comment data={comment} key={comment._id} />  
                ))} 
            
                </>
            )}
        </div>
    )
    
}

export default Comments