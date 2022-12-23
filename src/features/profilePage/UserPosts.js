import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { fetchPosts, throttleFunction } from "../../app/firebase";

import PostView from "../posts/PostTitlesView";

const UserPosts = ({ userId }) => {
    const fetchedPosts = useSelector(state => state.fetchedPosts);

    useEffect(() => {
        fetchPosts(userId);
    }, [])
    

    const handleScroll = (e) => {
        const container = e.target;
        if (container.scrollTop === 0) fetchPosts(userId);
        let totalMoved = container.scrollTop + container.offsetHeight;
        if (totalMoved >= container.scrollHeight) {
            console.log('scroll end');
            throttleFunction(fetchPosts, 2000)(userId);
        };
    }

    return (
        <div id="user-posts" className="post-title-container" onScroll={handleScroll}>{
            fetchedPosts.length < 1 ? <p>This user has not created any posts yet</p> :
            fetchedPosts.map(post => <PostView post={post} key={post.postId} />) 
        }</div>
    )

}

export default UserPosts