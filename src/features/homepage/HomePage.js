import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, resetQueryLast, throttleFunction } from "../../app/firebase";

import PostView from "../posts/PostTitlesView";
import { resetStateOnMount } from "../posts/fetchedPostsSlice";

const HomePage = () => {
    const fetchedPosts = useSelector(state => state.fetchedPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetStateOnMount());
        resetQueryLast();
        fetchPosts();
    }, []);


    const handleScroll = (e) => {
        const container = e.target;
        if (container.scrollTop === 0) fetchPosts();
        let totalMoved = container.scrollTop + container.offsetHeight;
        if (totalMoved >= container.scrollHeight) {
            throttleFunction(fetchPosts, 2000)();
        };
    }

    return (
        <div id="home-page">
            <div className="post-title-container" onScroll={handleScroll}>
                {
                    fetchedPosts.map(post => <PostView post={post} key={post.postId}/>)
                }
            </div>
        </div>
    )
}

export default HomePage;