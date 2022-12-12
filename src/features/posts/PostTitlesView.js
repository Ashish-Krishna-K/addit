import React from "react";
import { Link } from "react-router-dom";

const PostView = ({ post }) => {
    return (
        <Link to="/viewpost" state={{id: post.postId}} dataset-postid={post.postId}>
            <p>upvotes: {post.postUpvotes}</p>
            <p>{post.postTitle}</p>
            <p>replies: {post.repliesArray.length}</p>
        </Link>
    )
}

export default PostView