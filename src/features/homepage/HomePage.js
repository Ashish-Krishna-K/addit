import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, resetQueryLast } from "../../app/firebase";

import PostView from "../posts/PostTitlesView";
import { resetStateOnMount } from "../posts/fetchedPostsSlice";

const HomePage = () => {
    const fetchedPosts = useSelector(state => state.fetchedPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetStateOnMount());
    }, [])

    useEffect(() => {
        fetchPosts();
    }, [])

    const handleScroll = (e) => {
        const container = e.target;
        if (container.scrollTop + container.offsetHeight === container.scrollHeight) {
            fetchPosts()
        };
    }

    return (
        <div className="post-title-container" onScroll={handleScroll}>
            {
                fetchedPosts.map(post => <PostView post={post} key={post.postId}/>)
            }
        </div>
    )
}

export default HomePage;