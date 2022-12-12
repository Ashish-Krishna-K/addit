import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { fetchPosts } from "../../app/firebase";

const HomePage = () => {
    const fetchedPosts = useSelector(state => state.fetchedPosts);

    useEffect(() => {
        fetchPosts();
    }, [])

    console.log(fetchedPosts);
    return (
            <div>{
                fetchedPosts.map(post => {
                    return (
                        <div dataset-postid={post.postId} key={post.postId}>
                            <p>upvotes: {post.postUpvotes}</p>
                            <p>{post.postTitle}</p>
                            <p>replies: {post.repliesArray.length}</p>
                        </div>
                    )
                })
            }</div>
    )
}

export default HomePage;