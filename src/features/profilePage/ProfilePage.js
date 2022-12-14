import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserPosts from "./UserPosts";
import UserReplies from "./UserComments";

import { resetStateOnMount } from "../posts/fetchedPostsSlice";

const ProfilePage = () => {
    const user = useSelector(state => state.loggedInUser);
    const dispatch = useDispatch();
    const [viewItems, setViewItems] = useState({ value: 'posts' })

    const handleViewButtonClick = (e) => {
        setViewItems({ value: e.target.dataset.type })
    }

    useEffect(() => {dispatch(resetStateOnMount())}, [])

    return (
        <div>
            <div>
                <p>{user.displayName}</p>
                <button data-type='posts' onClick={handleViewButtonClick}>Posts</button>
                <button data-type='comments' onClick={handleViewButtonClick}>Comments</button>
            </div>
            {viewItems.value === 'posts' && <UserPosts />}
            {viewItems.value === 'comments' && <UserReplies />}
        </div>    
    )
}

export default ProfilePage
