import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { fetchPosts } from "../../app/firebase";

import PostView from "../posts/PostTitlesView";

const UserPosts = ({ userId }) => {
    const fetchedPosts = useSelector(state => state.fetchedPosts);

    useEffect(() => {
        fetchPosts(userId);
    }, [])

    const handleScroll = (e) => {
        const container = e.target;
        if (container.scrollTop + container.offsetHeight === container.scrollHeight) {
            fetchPosts(userId);
        };
    }

    return (
        <div id="user-posts" className="post-title-container" onScroll={handleScroll}>{
            fetchedPosts.length < 1 ? <p>Loading</p> :
            fetchedPosts.map(post => <PostView post={post} key={post.postId} />) 
        }</div>
    )

}

export default UserPosts