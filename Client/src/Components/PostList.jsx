import React from "react"
import PostListItem from "./PostListItem"
import axios from 'axios';
import { useQuery} from '@tanstack/react-query'
import { useEffect } from "react";

const fetchPosts = async() => {
    const res = await axios.get('http://localhost:3000/posts');
    console.log(res.data)
    return res.data
}

const PostList = () => {

    // useEffect( () => {
    //     fetchPosts();
    // })

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>  fetchPosts,
      })

      console.log(data)
      
    
      if (isLoading) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message

      

    return(<div className="mb-8 flex flex-col gap-12">
        <PostListItem />
        <PostListItem />
        <PostListItem />
        <PostListItem />
        <PostListItem />
        <PostListItem />
        <PostListItem />
        <PostListItem />
    </div>)
}

export default PostList