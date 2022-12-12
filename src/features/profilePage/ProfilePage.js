import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { fetchPosts } from "../../app/firebase";

import PostView from "../posts/PostTitlesView";

const ProfilePage = () => {
    const fetchedPosts = useSelector(state => state.fetchedPosts);
    const user = useSelector(state => state.loggedInUser);

    useEffect(() => {
        // fetchPosts(user.uid);
    }, [])

    console.log(fetchedPosts);
    return (
        <>
            <div>
                <p>{user.displayName}</p>
            </div>
            <div>{
                fetchedPosts.map(post => <PostView post={post} key={post.postId}/>)
            }</div>
        </>    
    )
}

export default ProfilePage
