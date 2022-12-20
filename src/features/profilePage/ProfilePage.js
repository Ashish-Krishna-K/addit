import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import UserPosts from "./UserPosts";
import UserReplies from "./UserComments";

import { resetStateOnMount } from "../posts/fetchedPostsSlice";
import { resetQueryLast } from "../../app/firebase";
import { resetCommentStateOnMount } from "../comments/fetchedCommentsSlice";
import DisplayUser from "../currentUser/DisplayUser";

const ProfilePage = () => {
    const location = useLocation();
    const user = location.state;
    const dispatch = useDispatch();
    const [viewItems, setViewItems] = useState({ value: 'posts' });

    const handleViewButtonClick = (e) => {
        setViewItems({ value: e.target.dataset.type })
    }

    useEffect(() => {
        dispatch(resetStateOnMount());
        dispatch(resetCommentStateOnMount());
        resetQueryLast();
    }, [location]);

    
    return (
        <div id="profile-page" key={user.uid}>
            <div id="user-details">
                <DisplayUser user={user} />
                <button data-type='posts' onClick={handleViewButtonClick}>Posts</button>
                <button data-type='comments' onClick={handleViewButtonClick}>Comments</button>
            </div>
            {viewItems.value === 'posts' && <UserPosts userId={user.uid}/>}
            {viewItems.value === 'comments' && <UserReplies userId={user.uid}/>}
        </div>    
    )
}

export default ProfilePage
