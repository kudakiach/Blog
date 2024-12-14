import React from "react"
import PostListItem from "./PostListItem"
import axios from 'axios';
import { useQuery, useInfiniteQuery} from '@tanstack/react-query'
import { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import {format} from 'timeago.js'

const fetchPosts = async(pageParam) => {
    const res = await axios.get('http://localhost:3000/posts', {
        params : {page:pageParam, limit:2}
    })
    console.log(res.data)
    return res.data
}

const PostList = () => {

    // useEffect( () => {
    //     fetchPosts();
    // })

    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['repoData'],
    //     queryFn: () =>  fetchPosts,
    //   })

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery ({
        queryKey: ['posts'],
        queryFn:({pageParam = 1}) => fetchPosts(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
      })

      
      if (status == "loading") return 'Loading...'
    
      if (status === "error") return 'An error has occurred: ' + error.message


      console.log(data)

      const allPosts = data?.pages?.flatMap( (page) => page.posts) || [];
      
    
      

    return(
        <InfiniteScroll
        dataLength={allPosts.length} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <div className="flex my-4 flex-1 justify-center text-center">
            
             <div className="bg-white rounded-md px-10 py-1">
                No more Posts to Load
             </div>
          </div>
        }
      >
        
     
        {
            allPosts.map(post=>(
                <PostListItem key={post._id} post={post} />
            ))
        }
       
       </InfiniteScroll>
    )
}

export default PostList