import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios";
import { toast } from "react-toastify";

const MenuActions = ({ post }) => {

    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const isAdmin = user.role === 'admin';

    const { isPending, error, data: savedPosts } = useQuery({
        queryKey: ["savedPosts"],
        queryFn: async () => {
            return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },

    })

    console.log(savedPosts)

    const isSaved = savedPosts?.data?.some((p) => p === post._id)
    console.log(isSaved)

    const savedMutation = useMutation({
        mutationFn: async () => {
            return axios.patch(`${import.meta.env.VITE_API_URL}/users/saved`, { postId: post._id }, {
                headers: {
                    Authorization: `Bearers ${token}`
                }
            });
        },
        onSuccess: () => {
            toast.success(isSaved ? "Post Unsaved" : "post saved");

        },
        onError: (err) => {
            toast.error("Failed to save post" + err);
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async () => {
            return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearers ${token}`
                }
            });
        },
        onSuccess: () => {
            toast.success("Post deleted");
            navigate('/');
        },
        onError: (err) => {
            toast.error("Failed to Delete post" + err);
        }
    })


    const handlePostSave = () => {
        savedMutation.mutate();
    };

    const handlePostDelete = () => {
        deleteMutation.mutate()
    };

    return (
        <div className="mt-3">
            <h1 className="font-semibold">Actions</h1>
            {
                isPending ? ("Loading...") : error ? ("Saved post fetch failed") : (
                    <><div className="flex py-2 text-sm cursor-pointer gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"

                            onClick={handlePostSave}
                        >
                            <path
                                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 16h14M7 3v4h10V3"
                                fill={isSaved ? "black" : "none"}
                            />
                        </svg>
                        {savedMutation.isPending ? <span className="text-orange-700">Saving In progress...</span> : <span className="text-lime-600">Save Post</span>}
                        
                    </div>
                        {user && (user.username == post.user.username || isAdmin) && < div className="flex py-2 text-sm cursor-pointer gap-2">
                            <img src="delete.svg" onClick={handlePostDelete} />
                            {deleteMutation.isPending ? <span>Delete In progress...</span> : <span className="text-red-400">Delete this Post</span>}
                        </div>}
                    </>
                )
            }

        </div>
    )
}

export default MenuActions