import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from "../../app/firebase";

import PostView from "../posts/PostTitlesView";
import { resetStateOnMount } from "../posts/fetchedPostsSlice";

const HomePage = () => {
    const fetchedPosts = useSelector(state => state.fetchedPosts);
    const dispatch = useDispatch();

    useEffect(() => {dispatch(resetStateOnMount())}, [])

    useEffect(() => {
        fetchPosts();
    }, [])

    const handleScroll = (e) => {
        console.log('scrolling');
        console.log(e)
    }

    return (
        <div className="post-title-container" onScroll={handleScroll}>
            <div>{
                fetchedPosts.map(post => <PostView post={post} key={post.postId}/>)
            }</div>
        </div>
    )
}

export default HomePage;