import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { fetchPosts } from "../../app/firebase";

import PostView from "../posts/PostTitlesView";

const UserPosts = () => {
    const location = useLocation();
    const fetchedPosts = useSelector(state => state.fetchedPosts);
    const user = useSelector(state => state.loggedInUser);

    useEffect(() => {
        if (!location.state) {
            fetchPosts(user.uid);
        } else {
            const { userId } = location.state;
            fetchPosts(userId);
        }
    }, [])

    return (
        <div id="user-posts">{
            fetchedPosts.length < 1 ? <p>Loading</p> :
            fetchedPosts.map(post => <PostView post={post} key={post.postId} />) 
        }</div>
    )

}

export default UserPosts