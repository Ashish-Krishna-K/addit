import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { fetchPosts } from "../../app/firebase";
import { fetchComments } from "../../app/firebase";

import PostView from "../posts/PostTitlesView";
import ReplyView from "../comments/ReplyView";

const ProfilePage = () => {
    const location = useLocation();
    const fetchedPosts = useSelector(state => state.fetchedPosts);
    const fetchedComments = useSelector(state => state.fetchedComments);
    const user = useSelector(state => state.loggedInUser);

    const [viewItems, setViewItems] = useState({ value: 'posts' })

    useEffect(() => {
        if (!location.state) {
            if (viewItems.value === 'posts') fetchPosts(user.uid);
            if (viewItems.value === 'comments') fetchComments(user.uid);
        } else {
            const { userId } = location.state;
            if (viewItems.value === 'posts') fetchPosts(userId);
            if (viewItems.value === 'comments') fetchComments(userId);
        }
    }, [viewItems])

    const handleViewButtonClick = (e) => {
        setViewItems({ value: e.target.dataset.type })
    }

    return (
        <div>
            <div>
                <p>{user.displayName}</p>
                <button data-type='posts' onClick={handleViewButtonClick}>Posts</button>
                <button data-type='comments' onClick={handleViewButtonClick}>Comments</button>
            </div>
            <div id="user-posts">{
            viewItems.value === 'posts' && fetchedPosts.map(post => <PostView post={post} key={post.postId} />)
            }</div>
            <div id="user-replies">{viewItems.value === 'comments' && fetchedComments.map(comment => <ReplyView reply={comment} key={comment.replyId} />)}</div>
        </div>    
    )
}

export default ProfilePage
