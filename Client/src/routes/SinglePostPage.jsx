import React from "react"
import { Link, useParams } from "react-router-dom"
import ImageKit from "../Components/Image"
import MenuActions from "../Components/MenuActions"
import Search from "../Components/Search"
import Comments from "../Components/Comments"
import DOMPurify from "dompurify";

import axios from 'axios';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'timeago.js'
import DisplayContent from "../Components/DisplayContent"

const fetchPost = async (slug) => {
    const res = await axios.get(`http://localhost:3000/posts/${slug}`)
    console.log(res.data)
    return res.data
}

const SinglePostPage = () => {

    const { slug } = useParams();

    const { isPending, error, data } = useQuery({
        queryKey: ["post", slug],
        queryFn: () => fetchPost(slug),
    })


    if (isPending) return "Loading..."
    if (error) return "Something went wrong" + error.message
    if (!data) return "Post not Found"

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-4 lg:w-3/5">
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">
                        {data.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm">
                        <span>Writen By</span>
                        <Link className="text-blue-500">{data.user.username.split("@")[0]}</Link>
                        <span >On</span>
                        <Link className="text-blue-800">{data.category}</Link>
                        <span className="text-gray-600">2{format(data.createdAt)}</span>
                    </div>
                    <p className="text-sm">
                        {data.desc}</p>
                </div>

                {data.img && <div className="hidden lg:block lg:w-2/5 ">
                    {/* <ImageKit path="postImg.jpeg"  w={735} description={"postImg"} /> */}
                    <ImageKit
                        src={`${data.img}`}
                        className={"rounded-2xl object-cover"}
                        w={600}
                        description={data.slug}
                    />
                </div>}
            </div>

            <div className="flex gap-8 mt-8">
                <div className="flex flex-col w-2/3">

                    <div>
                        <DisplayContent content={data.content} />

                    </div>

                    <div className="mt-4 mb-4">
                        <Comments key={data._id} postId={data._id} />
                    </div>


                </div>
                <div className="px-4 sticky h-max top-8 w-1/3">
                    <h1 className="font-semibold">Author</h1>
                    <div className="flex flex-row gap-4 mt-2 items-center">
                        {data.user.img && <ImageKit
                            src={`${data.user.img}`}

                            className="w-12 h-12 rounded-full aspect-video object-cover"
                            w={48}
                            h={48}
                            description={data.user.username.split("@") + "-img"}
                        />}

                        <Link className="text-blue-700"> {data.user.username.split("@")[0]}</Link>

                    </div>
                    <p className="text-xs mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="flex mt-2 gap-4">
                        <img src="facebook.svg" />
                        <img src="instagram.svg" />
                    </div>
                    {/* Action */}
                    <MenuActions />

                    {/* Category */}

                    <div className="flex flex-col gap-2">
                        <h1 className="font-semibold mt-4 mb-3"> Categories</h1>
                        <Link className="text-sm underline"> All </Link>
                        <Link className="text-sm underline"> Web Design </Link>
                        <Link className="text-sm underline"> Web Development </Link>
                        <Link className="text-sm underline"> SEO </Link>
                    </div>

                    {/* Search */}
                    <h1 className="mt-4">Search</h1>
                    <Search />
                </div>

            </div>

        </div>
    )
}

export default SinglePostPage