import React from "react";
import { useSelector } from "react-redux";

const ViewPost = () => {
    const fetchedPosts = useSelector(state => state.fetchedPosts);

    return (
        <div>
            <p>Post</p>
        </div>
    )
}

export default ViewPost