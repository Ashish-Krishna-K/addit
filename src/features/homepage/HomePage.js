import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { fetchPosts } from "../../app/firebase";

import PostView from "../posts/PostTitlesView";

const HomePage = () => {
    const fetchedPosts = useSelector(state => state.fetchedPosts);

    useEffect(() => {
        fetchPosts();
    }, [])

    console.log(fetchedPosts);
    return (
        <div>{
            fetchedPosts.map(post => <PostView post={post} key={post.postId}/>)
        }</div>
    )
}

export default HomePage;