import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { fetchSinglePost } from "../../app/firebase";

const ViewPost = () => {
    const location = useLocation();
    const { id } = location.state;
    const [activePost, setActivePost] = useState({})

    useEffect(() => {
        fetchSinglePost(id).then((post) => {
            setActivePost(Object.assign(post));
        })
    }, [])

    const {
        postId,
        createdBy,
        createdAt,
        postTitle,
        postContent,
        postUpvotes,
        repliesArray
    } = activePost
    const { displayName } = createdBy;
    const { content } = postContent;
        
    return (
        
        <div>
            <p>{postTitle}</p>
            <p>{displayName}</p>
            <p>{postUpvotes}</p>
            <p>{content}</p>
        </div>
    )
}

export default ViewPost